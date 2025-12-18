---
title: "Lesson 1.2: Nodes, Topics, Services and Actions"
sidebar_position: 3
description: "Understanding communication patterns in ROS 2: nodes, topics, services and actions"
tags: [ros2, nodes, topics, services, actions, communication]
author: Textbook Team
author_title: Physical AI & Robotics Education
keywords: [ros2 nodes, ros2 topics, ros2 services, ros2 actions, robotics communication]
---

import PersonalizationButton from '@site/src/components/PersonalizationButton';

# Lesson 1.2: Nodes, Topics, Services and Actions

<PersonalizationButton />

## Overview

In this lesson, we'll explore the core communication patterns in ROS 2: nodes, topics, services, and actions. Understanding these communication mechanisms is essential for building effective Physical AI systems that can coordinate multiple components seamlessly.

This lesson builds upon the architectural concepts from Lesson 1.1, diving deeper into how different parts of a robotic system communicate and coordinate with one another.

## Learning Objectives

After completing this lesson, you will be able to:
- Implement ROS 2 nodes with proper lifecycle management
- Create and use topics for asynchronous communication
- Design and implement services for synchronous communication
- Understand when to use actions for long-running tasks

## Nodes in ROS 2

A node is the fundamental unit of computation in ROS 2. Each node is an instance of a single executable that uses ROS client libraries to communicate with other nodes.

### Node Creation

To create a node in Python:

```python
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node_name')
        # Initialize node components here

def main(args=None):
    rclpy.init(args=args)
    my_node = MyNode()
    rclpy.spin(my_node)
    my_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Node Parameters

Nodes can use parameters for configuration:

```python
class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')
        
        # Declare parameters
        self.declare_parameter('param_name', 'default_value')
        
        # Get parameter value
        param_value = self.get_parameter('param_name').value
```

## Topics - Publish/Subscribe Communication

Topics enable asynchronous, one-to-many communication through a publish/subscribe model.

### Publisher Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World'
        self.publisher.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
```

### Subscriber Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
```

## Services - Request/Response Communication

Services provide synchronous, one-to-one communication for request/response interactions.

### Service Server

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Returning: {request.a} + {request.b} = {response.sum}')
        return response
```

### Service Client

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalClient(Node):
    def __init__(self):
        super().__init__('minimal_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')

    def send_request(self, a, b):
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')

        request = AddTwoInts.Request()
        request.a = a
        request.b = b
        self.future = self.cli.call_async(request)
```

## Actions - Goal/Result Feedback Communication

Actions are used for long-running tasks that require feedback, status updates, and cancellation.

### Action Server

```python
import time
import rclpy
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from rclpy.node import Node
from example_interfaces.action import Fibonacci

class FibonacciActionServer(Node):
    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled')
                return Fibonacci.Result()

            feedback_msg.sequence.append(feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info(f'Feedback: {feedback_msg.sequence}')
            goal_handle.publish_feedback(feedback_msg)
            time.sleep(1)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        return result
```

## Implementation Considerations

### When to Use Each Pattern

- **Topics**: Use for continuous data streams (sensor data, status updates)
- **Services**: Use for request/response interactions (configuration changes, calculations)
- **Actions**: Use for long-running tasks with feedback (navigation, manipulation)

### Quality of Service Considerations

Different QoS settings can significantly impact communication behavior:

```python
from rclpy.qos import QoSProfile, QoSDurabilityPolicy, QoSHistoryPolicy, QoSReliabilityPolicy

# Reliable, persistent communication
qos_profile = QoSProfile(
    history=QoSHistoryPolicy.KEEP_LAST,
    depth=10,
    reliability=QoSReliabilityPolicy.RELIABLE,
    durability=QoSDurabilityPolicy.TRANSIENT_LOCAL)
```

## Ethical and Social Implications

Communication patterns in robotics have ethical implications:

- **Transparency**: Clear interfaces help ensure system behavior is understandable
- **Accountability**: Well-defined communication channels enable traceability of decisions
- **Safety**: Appropriate QoS settings ensure critical messages are delivered reliably
- **Privacy**: Communication protocols must consider data security requirements

Consider how your communication design choices affect the overall trustworthiness and safety of your Physical AI system.

## Summary

ROS 2 provides three primary communication patterns that serve different purposes:
- Topics for asynchronous, broadcast communication
- Services for synchronous request/response interactions
- Actions for long-running tasks with feedback and cancellation

Each pattern has appropriate use cases, and understanding when to apply each is crucial for effective robotic system design.

## Self-Assessment

1. What are the key differences between topics, services, and actions?
2. When would you use a service instead of a topic for communication?
3. What are Quality of Service (QoS) settings and why are they important?
4. How do communication patterns affect the reliability and safety of robotic systems?

## Next Steps

In the next module, we'll explore simulation environments where you can practice implementing these communication patterns in safe, virtual environments before applying them to physical robots.

## Further Reading

- [ROS 2 Topics vs Services vs Actions](https://docs.ros.org/en/rolling/Concepts/About-Topics-Services-Actions.html)
- [Quality of Service in ROS 2](https://docs.ros.org/en/rolling/Concepts/About-Quality-of-Service-Settings.html)

<PersonalizationButton />