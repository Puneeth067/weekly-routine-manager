// src/components/StudyRoadmap.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Database, Monitor, Globe, BarChart3, CheckCircle2 } from 'lucide-react';

interface RoadmapItem {
  id: string;
  text: string;
  subtopics?: string[];
}

interface RoadmapSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  items: RoadmapItem[];
}

const StudyRoadmap = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const roadmapData: RoadmapSection[] = [
    {
      id: 'dsa',
      title: 'DSA (Data Structures & Algorithms)',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      items: [
        {
          id: 'arrays-strings',
          text: 'Arrays & Strings',
          subtopics: ['Sliding window, two pointers, prefix sums', 'Sorting algorithms (quick, merge, counting)']
        },
        {
          id: 'linked-lists',
          text: 'Linked Lists',
          subtopics: ['Singly & doubly linked lists', 'Reversal, cycle detection (Floyd\'s algorithm)']
        },
        {
          id: 'stacks-queues',
          text: 'Stacks & Queues',
          subtopics: ['Monotonic stack, infix-postfix-prefix conversion', 'Deque applications, LRU cache']
        },
        {
          id: 'trees-graphs',
          text: 'Trees & Graphs',
          subtopics: ['Binary trees, BSTs, traversals (DFS, BFS)', 'Lowest Common Ancestor, Segment Trees', 'Graph traversals (BFS, DFS), Topological sort', 'Dijkstra, Prim\'s, Kruskal\'s']
        },
        {
          id: 'recursion-backtracking',
          text: 'Recursion & Backtracking',
          subtopics: ['N-Queens, Sudoku solver, Subsets, Permutations']
        },
        {
          id: 'dynamic-programming',
          text: 'Dynamic Programming',
          subtopics: ['0/1 Knapsack, LIS, LCS, Matrix Chain Multiplication']
        },
        {
          id: 'greedy-algorithms',
          text: 'Greedy Algorithms',
          subtopics: ['Activity selection, Huffman coding']
        },
        {
          id: 'bit-manipulation',
          text: 'Bit Manipulation',
          subtopics: ['Set/unset/toggle bits, XOR tricks']
        },
        {
          id: 'tries-heaps',
          text: 'Tries & Heaps',
          subtopics: ['Implement trie, priority queues, heapsort']
        },
        {
          id: 'interview-practice',
          text: 'Interview Practice',
          subtopics: ['Daily 1-2 Leetcode medium/hard problems']
        }
      ]
    },
    {
      id: 'dbms',
      title: 'DBMS (Database Management Systems)',
      icon: <Database className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      items: [
        {
          id: 'er-normalization',
          text: 'ER Diagrams & Normalization',
          subtopics: ['1NF, 2NF, 3NF, BCNF, decomposition']
        },
        {
          id: 'sql-queries',
          text: 'SQL & Queries',
          subtopics: ['Joins, subqueries, aggregations, views']
        },
        {
          id: 'indexing-optimization',
          text: 'Indexing & Query Optimization',
          subtopics: ['B+ trees, hashing']
        },
        {
          id: 'transactions-concurrency',
          text: 'Transactions & Concurrency',
          subtopics: ['ACID, schedules, locks, 2-phase locking']
        },
        {
          id: 'storage-organization',
          text: 'Storage & File Organization',
          subtopics: ['Heap files, sorted files, clustered vs unclustered index']
        },
        {
          id: 'distributed-nosql',
          text: 'Distributed Databases & NoSQL',
          subtopics: ['CAP theorem, sharding, replication']
        }
      ]
    },
    {
      id: 'os',
      title: 'Operating Systems',
      icon: <Monitor className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      items: [
        {
          id: 'processes-threads',
          text: 'Processes & Threads',
          subtopics: ['Lifecycle, context switching, threading models']
        },
        {
          id: 'cpu-scheduling',
          text: 'CPU Scheduling',
          subtopics: ['FCFS, SJF, Round Robin, Priority']
        },
        {
          id: 'memory-management',
          text: 'Memory Management',
          subtopics: ['Paging, segmentation, virtual memory, TLB']
        },
        {
          id: 'deadlocks',
          text: 'Deadlocks',
          subtopics: ['Conditions, prevention, avoidance (Banker\'s algorithm)']
        },
        {
          id: 'file-systems',
          text: 'File Systems',
          subtopics: ['Directory structure, I-nodes, file allocation']
        },
        {
          id: 'synchronization',
          text: 'Synchronization',
          subtopics: ['Semaphores, mutex, monitors, producer-consumer']
        },
        {
          id: 'io-systems',
          text: 'I/O Systems',
          subtopics: ['Interrupts, polling, DMA']
        }
      ]
    },
    {
      id: 'fullstack',
      title: 'Full Stack Web Development',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      items: [
        {
          id: 'html-css-js',
          text: 'HTML/CSS/JavaScript',
          subtopics: ['Flexbox, Grid, DOM manipulation']
        },
        {
          id: 'react-framework',
          text: 'React Framework',
          subtopics: ['Hooks, component lifecycle, routing, context API']
        },
        {
          id: 'state-management',
          text: 'State Management',
          subtopics: ['Redux or Context API, props drilling']
        },
        {
          id: 'testing-deployment-fe',
          text: 'Testing & Deployment (Frontend)',
          subtopics: ['Jest, React Testing Library, Vite, CI/CD basics']
        },
        {
          id: 'nodejs-express',
          text: 'Node.js + Express',
          subtopics: ['REST APIs, middleware, routing']
        },
        {
          id: 'authentication',
          text: 'Authentication',
          subtopics: ['JWT, OAuth, sessions, password hashing']
        },
        {
          id: 'database-integration',
          text: 'Database Integration',
          subtopics: ['PostgreSQL or MongoDB (ORM/ODM like Prisma or Mongoose)']
        },
        {
          id: 'deployment-backend',
          text: 'Deployment',
          subtopics: ['Docker, cloud platforms (Render/Heroku/Vercel)']
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-teal-500 to-teal-600',
      items: [
        {
          id: 'python-analysis',
          text: 'Python for Data Analysis',
          subtopics: ['Pandas, NumPy, Matplotlib, Seaborn']
        },
        {
          id: 'stats-probability',
          text: 'Statistics & Probability',
          subtopics: ['Descriptive stats, probability distributions']
        },
        {
          id: 'eda',
          text: 'Exploratory Data Analysis (EDA)',
          subtopics: ['Data cleaning, missing values, correlation']
        },
        {
          id: 'data-visualization',
          text: 'Data Visualization',
          subtopics: ['Charts, graphs, dashboards']
        },
        {
          id: 'sql-analytics',
          text: 'SQL for Analytics',
          subtopics: ['Complex joins, window functions, CTEs']
        },
        {
          id: 'intro-ml',
          text: 'Intro to ML (Optional)',
          subtopics: ['Linear regression, clustering, classification (scikit-learn)']
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getCompletionRate = (sectionId: string) => {
    const section = roadmapData.find(s => s.id === sectionId);
    if (!section) return 0;
    
    let totalItems = 0;
    let completedItems = 0;
    
    section.items.forEach(item => {
      totalItems += 1;
      if (checkedItems[item.id]) completedItems += 1;
      
      if (item.subtopics) {
        item.subtopics.forEach((_, index) => {
          totalItems += 1;
          if (checkedItems[`${item.id}-${index}`]) completedItems += 1;
        });
      }
    });
    
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Study Roadmaps
        </h2>
      </div>

      <div className="space-y-4">
        {roadmapData.map((section) => {
          const completionRate = getCompletionRate(section.id);
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full p-4 bg-gradient-to-r ${section.color} text-white hover:opacity-90 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {section.icon}
                    <div className="text-left">
                      <span className="font-semibold text-base block">{section.title}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-500"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{completionRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {completionRate === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-green-300" />
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                  {section.items.map((item) => (
                    <div key={item.id} className="space-y-3 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={checkedItems[item.id] || false}
                          onChange={() => toggleItem(item.id)}
                          className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={item.id}
                          className={`text-sm font-semibold cursor-pointer transition-all duration-200 ${
                            checkedItems[item.id]
                              ? 'line-through text-green-600 dark:text-green-400'
                              : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300'
                          }`}
                        >
                          {item.text}
                        </label>
                      </div>
                      
                      {item.subtopics && (
                        <div className="ml-7 space-y-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          {item.subtopics.map((subtopic, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <input
                                type="checkbox"
                                id={`${item.id}-${index}`}
                                checked={checkedItems[`${item.id}-${index}`] || false}
                                onChange={() => toggleItem(`${item.id}-${index}`)}
                                className="w-3 h-3 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor={`${item.id}-${index}`}
                                className={`text-xs cursor-pointer transition-all duration-200 leading-relaxed ${
                                  checkedItems[`${item.id}-${index}`]
                                    ? 'line-through text-green-500 dark:text-green-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                                }`}
                              >
                                {subtopic}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyRoadmap;