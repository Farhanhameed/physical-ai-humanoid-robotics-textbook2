import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction'
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 Fundamentals',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 1: ROS 2 Architecture',
          items: [
            'module1/chapter1/lesson1-1-ros2-architecture-overview',
            'module1/chapter1/lesson1-2-nodes-topics-services'
          ]
        },
        {
          type: 'category',
          label: 'Chapter 2: ROS 2 Programming',
          items: [
            'module1/chapter2/lesson2-1-ros2-programming-python',
            'module1/chapter2/lesson2-2-ros2-programming-cpp'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Module 2: Simulation Environments',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 3: Gazebo Simulation',
          items: [
            'module2/chapter3/lesson3-1-gazebo-setup-modeling',
            'module2/chapter3/lesson3-2-gazebo-physics-control'
          ]
        },
        {
          type: 'category',
          label: 'Chapter 4: Unity Integration',
          items: [
            'module2/chapter4/lesson4-1-unity-robotics-hub',
            'module2/chapter4/lesson4-2-vr-ar-integration'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Module 3: NVIDIA Technologies',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 5: Isaac ROS',
          items: [
            'module3/chapter5/lesson5-1-isaac-ros-pipelines',
            'module3/chapter5/lesson5-2-isaac-ros-acceleration'
          ]
        },
        {
          type: 'category',
          label: 'Chapter 6: Isaac Sim',
          items: [
            'module3/chapter6/lesson6-1-isaac-sim-setup',
            'module3/chapter6/lesson6-2-isaac-sim-scenarios'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Module 4: Advanced AI',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 7: NVIDIA Isaac',
          items: [
            'module4/chapter7/lesson7-1-isaac-core-concepts',
            'module4/chapter7/lesson7-2-isaac-perception-navigation'
          ]
        },
        {
          type: 'category',
          label: 'Chapter 8: Vision Language Actions (VLA)',
          items: [
            'module4/chapter8/lesson8-1-vla-fundamentals',
            'module4/chapter8/lesson8-2-vla-implementation'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Appendices',
      collapsible: true,
      collapsed: true,
      items: [
        'appendices/glossary',
        'appendices/resources',
        'appendices/references'
      ]
    }
  ],
};

export default sidebars;
