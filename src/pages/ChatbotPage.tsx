import React, { useState } from 'react';
import { Send, ChevronRight, ChevronLeft, MessageCircle, ThumbsUp, Share2, MoreHorizontal, HelpCircle, ChevronDown, ChevronUp, Bot } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  abilities: string[];
  color: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const agents: Agent[] = [
  {
    id: 'mark',
    name: 'Mark',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    abilities: ['Event Planning', 'Activity Recommendations', 'Schedule Management'],
    color: 'blue'
  },
  {
    id: 'athena',
    name: 'Athena',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg',
    abilities: ['Real Estate/Investment', 'Property Analysis', 'Market Insights'],
    color: 'purple'
  },
  {
    id: 'nova',
    name: 'Nova',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-7.jpg',
    abilities: ['Booking and Logistics', 'Travel Planning', 'Transportation'],
    color: 'green'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg',
    abilities: ['Place Discovery', 'Local Recommendations', 'Cultural Insights'],
    color: 'orange'
  },
  {
    id: 'luna',
    name: 'Luna',
    avatar: 'https://images.generated.photos/kMohesO15iKpSK0r-wuXxmHwFh9Msw0CmBdStJsslGQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDU4MzMxLmpwZw.jpg',
    abilities: ['Entertainment Guide', 'Activity Matching', 'Social Planning'],
    color: 'pink'
  }
];

const topics = [
  'Forum',
  'Offre',
  'History',
  'Topics',
  'Visios',
  'Support',
  'News'
];

const topicFAQs: Record<string, FAQ[]> = {
  'Forum': [
    {
      id: 'f1',
      question: 'How do I create a new forum post?',
      answer: 'To create a new forum post, click on the "New Post" button in the top right corner of the forum page. Fill in the title, select appropriate tags, and write your content. Make sure to follow our community guidelines.',
      category: 'Forum Usage',
      helpful: 45
    },
    {
      id: 'f2',
      question: 'How can I edit or delete my forum posts?',
      answer: 'You can edit your posts by clicking the three dots menu next to your post and selecting "Edit". You can delete posts within 24 hours of posting. After that, contact a moderator for assistance.',
      category: 'Forum Management',
      helpful: 32
    },
    {
      id: 'f3',
      question: 'What are the forum community guidelines?',
      answer: 'Our forum guidelines include: be respectful to all members, stay on topic, no spam or self-promotion, use appropriate language, and provide constructive feedback. Violations may result in warnings or account suspension.',
      category: 'Community Rules',
      helpful: 67
    },
    {
      id: 'f4',
      question: 'How do I report inappropriate content?',
      answer: 'Click the flag icon next to any post or comment to report it. Provide a brief explanation of why you\'re reporting it. Our moderation team reviews all reports within 24 hours.',
      category: 'Moderation',
      helpful: 28
    }
  ],
  'Offre': [
    {
      id: 'o1',
      question: 'How do I create a new offer?',
      answer: 'Navigate to the "Create Offer" section, fill in all required details including title, description, price, and availability. Upload high-quality images and set your terms and conditions.',
      category: 'Creating Offers',
      helpful: 52
    },
    {
      id: 'o2',
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets. Payment processing is secure and encrypted.',
      category: 'Payments',
      helpful: 78
    },
    {
      id: 'o3',
      question: 'How do I manage my offer listings?',
      answer: 'Go to your dashboard and click on "My Offers". From there you can edit details, update availability, view analytics, and manage bookings. You can also pause or delete offers.',
      category: 'Offer Management',
      helpful: 41
    },
    {
      id: 'o4',
      question: 'What are the commission fees?',
      answer: 'Our platform charges a 5% commission on successful bookings. This covers payment processing, customer support, and platform maintenance. No hidden fees.',
      category: 'Pricing',
      helpful: 63
    }
  ],
  'History': [
    {
      id: 'h1',
      question: 'How can I view my booking history?',
      answer: 'Access your booking history through your profile dashboard. Click on "History" to see all past and current bookings, including dates, amounts, and status.',
      category: 'Booking History',
      helpful: 39
    },
    {
      id: 'h2',
      question: 'Can I download my transaction history?',
      answer: 'Yes, you can export your transaction history as a CSV or PDF file. Go to your account settings and select "Export Data" to download your complete history.',
      category: 'Data Export',
      helpful: 25
    },
    {
      id: 'h3',
      question: 'How long is my history stored?',
      answer: 'We store your complete history for 7 years for legal and tax purposes. You can access this data anytime through your account dashboard.',
      category: 'Data Retention',
      helpful: 18
    }
  ],
  'Topics': [
    {
      id: 't1',
      question: 'How do I follow specific topics?',
      answer: 'Click the "Follow" button on any topic page to receive notifications about new posts and updates. You can manage your followed topics in your profile settings.',
      category: 'Topic Following',
      helpful: 34
    },
    {
      id: 't2',
      question: 'Can I create custom topics?',
      answer: 'Custom topics can be created by users with verified accounts. Submit a topic proposal through the "Suggest Topic" form, and our team will review it within 3-5 business days.',
      category: 'Topic Creation',
      helpful: 22
    },
    {
      id: 't3',
      question: 'How are topics moderated?',
      answer: 'Topics are moderated by our community team and volunteer moderators. We ensure content stays relevant and follows our guidelines. Off-topic posts may be moved or removed.',
      category: 'Topic Moderation',
      helpful: 29
    }
  ],
  'Visios': [
    {
      id: 'v1',
      question: 'How do I join a video session?',
      answer: 'Click on the video session link sent to your email or access it through your dashboard. Make sure you have a stable internet connection and allow camera/microphone permissions.',
      category: 'Joining Sessions',
      helpful: 56
    },
    {
      id: 'v2',
      question: 'What are the technical requirements?',
      answer: 'You need a modern web browser (Chrome, Firefox, Safari, Edge), stable internet connection (minimum 1 Mbps), and a device with camera and microphone for full participation.',
      category: 'Technical Requirements',
      helpful: 43
    },
    {
      id: 'v3',
      question: 'Can I record video sessions?',
      answer: 'Recording is available for premium users and session hosts. All participants will be notified when recording starts. Recordings are stored securely and can be accessed for 30 days.',
      category: 'Recording',
      helpful: 31
    }
  ],
  'Support': [
    {
      id: 's1',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through live chat (available 24/7), email (support@place2.com), or by submitting a ticket through your dashboard. Average response time is under 2 hours.',
      category: 'Contact Support',
      helpful: 89
    },
    {
      id: 's2',
      question: 'What information should I include in a support ticket?',
      answer: 'Include your account email, detailed description of the issue, steps you\'ve already tried, screenshots if applicable, and your browser/device information.',
      category: 'Support Tickets',
      helpful: 47
    },
    {
      id: 's3',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the reset email. If you don\'t receive it, check your spam folder.',
      category: 'Account Issues',
      helpful: 72
    }
  ],
  'News': [
    {
      id: 'n1',
      question: 'How often are news updates published?',
      answer: 'We publish news updates weekly, with breaking news and important announcements posted as needed. Subscribe to our newsletter to stay informed about all updates.',
      category: 'News Frequency',
      helpful: 26
    },
    {
      id: 'n2',
      question: 'Can I submit news or announcements?',
      answer: 'Community members can submit news through our "Submit News" form. All submissions are reviewed by our editorial team before publication.',
      category: 'News Submission',
      helpful: 19
    },
    {
      id: 'n3',
      question: 'How do I subscribe to news notifications?',
      answer: 'Enable news notifications in your account settings under "Notification Preferences". You can choose to receive updates via email, push notifications, or both.',
      category: 'News Notifications',
      helpful: 35
    }
  ]
};

const ChatbotPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isTopicExpanded, setIsTopicExpanded] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [chatbotTopic, setChatbotTopic] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      let responseText = '';
      if (chatbotTopic) {
        responseText = `I'm here to help you with questions about ${chatbotTopic}. ${inputMessage.includes('?') ? 'Let me provide you with detailed information about that.' : 'What specific aspect would you like to know more about?'}`;
      } else if (selectedAgent && selectedAbility) {
        responseText = `This is a response from ${selectedAgent.name} about ${selectedAbility}. How can I assist you further?`;
      } else if (selectedAgent) {
        responseText = `Hello! I'm ${selectedAgent.name}. I can help you with ${selectedAgent.abilities.join(', ')}. What would you like to know?`;
      } else {
        responseText = 'Hello! Please select an AI agent or topic to get started with your questions.';
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleAgentClick = (agent: Agent) => {
    if (expandedAgent === agent.id) {
      setExpandedAgent(null);
    } else {
      setExpandedAgent(agent.id);
      setSelectedAgent(agent);
      setSelectedAbility(null);
      setChatbotTopic(null); // Clear topic when selecting agent
    }
  };

  const handleAbilityClick = (ability: string) => {
    setSelectedAbility(ability);
    setChatbotTopic(null); // Clear topic when selecting ability
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setIsTopicExpanded(true);
  };

  const handleChatbotTopicClick = (topic: string) => {
    setChatbotTopic(topic);
    setSelectedAgent(null);
    setSelectedAbility(null);
    setExpandedAgent(null);
    
    // Add a welcome message for the topic
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `I'm now ready to help you with questions about ${topic}. Feel free to ask me anything that wasn't covered in the FAQ section!`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const renderFAQContent = () => {
    if (!selectedTopic || !topicFAQs[selectedTopic]) {
      return (
        <div className="p-6 text-center">
          <HelpCircle size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-500 mb-2">No FAQs Available</h3>
          <p className="text-slate-400">Select a topic to view frequently asked questions.</p>
        </div>
      );
    }

    const faqs = topicFAQs[selectedTopic];
    const categories = [...new Set(faqs.map(faq => faq.category))];

    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {selectedTopic} - Frequently Asked Questions
              </h3>
              <p className="text-slate-600 text-sm">
                Find answers to common questions about {selectedTopic.toLowerCase()}.
              </p>
            </div>
            <button
              onClick={() => handleChatbotTopicClick(selectedTopic)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Bot size={18} />
              <span>Ask Chatbot</span>
            </button>
          </div>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-medium text-slate-700 mb-4 border-b border-slate-200 pb-2">
              {category}
            </h4>
            <div className="space-y-3">
              {faqs
                .filter(faq => faq.category === category)
                .map(faq => (
                  <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 py-3 text-left bg-white hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-800 pr-4">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp size={20} className="text-slate-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-slate-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                        <p className="text-slate-700 mb-3">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                            <ThumbsUp size={16} />
                            <span>Helpful ({faq.helpful})</span>
                          </button>
                          <span className="text-xs text-slate-500">
                            Category: {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Sidebar - AI Agents */}
      <div className={`bg-white border-r border-slate-200 flex flex-col py-6 transition-all duration-300 ${
        isTopicExpanded ? 'w-48' : 'w-64'
      }`}>
        <h2 className="px-6 text-lg font-semibold text-slate-800 mb-4">AI Agents</h2>
        <div className="space-y-1 px-4 overflow-y-auto">
          {agents.map(agent => (
            <div key={agent.id}>
              <button
                onClick={() => handleAgentClick(agent)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedAgent?.id === agent.id 
                    ? `bg-${agent.color}-50 text-${agent.color}-700` 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{agent.name}</div>
                </div>
                <ChevronRight 
                  size={18} 
                  className={`transition-transform ${expandedAgent === agent.id ? 'rotate-90' : ''}`}
                />
              </button>
              
              {expandedAgent === agent.id && (
                <div className="ml-11 mt-1 space-y-1">
                  {agent.abilities.map((ability) => (
                    <button
                      key={ability}
                      onClick={() => handleAbilityClick(ability)}
                      className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                        selectedAbility === ability
                          ? `bg-${agent.color}-100 text-${agent.color}-700`
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {ability}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section - Chat */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isTopicExpanded ? 'w-[25%]' : 'w-[60%]'
      }`}>
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          {chatbotTopic ? (
            <div className="flex items-center">
              <Bot size={24} className="text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-slate-800">Topic Assistant</div>
                <div className="text-sm text-slate-500">Helping with {chatbotTopic}</div>
              </div>
            </div>
          ) : selectedAgent ? (
            <div className="flex items-center">
              <img 
                src={selectedAgent.avatar} 
                alt={selectedAgent.name}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-medium text-slate-800">{selectedAgent.name}</div>
                {selectedAbility && (
                  <div className="text-sm text-slate-500">{selectedAbility}</div>
                )}
              </div>
            </div>
          ) : (
            <span className="text-slate-500">Select an AI agent or use topic chatbot</span>
          )}
        </div>

        {/* Chat Messages - Adjusted height to leave space for input */}
        <div className="overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100vh - 180px)' }}>
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-800 border border-slate-200'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input - Fixed at bottom with proper height */}
        <div className="bg-white border-t border-slate-200 p-4 h-20 flex items-center">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={chatbotTopic ? `Ask about ${chatbotTopic}...` : "Type your message..."}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Topics */}
      <div className={`bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ${
        isTopicExpanded ? 'w-[60%]' : 'w-24'
      }`}>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className={`font-medium text-slate-800 ${!isTopicExpanded && 'sr-only'}`}>
            {selectedTopic || 'Topics'}
          </h3>
          <button
            onClick={() => setIsTopicExpanded(!isTopicExpanded)}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            {isTopicExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {isTopicExpanded ? (
          <div className="flex-1 overflow-y-auto">
            {selectedTopic ? (
              renderFAQContent()
            ) : (
              <div className="p-6 text-center">
                <h3 className="text-lg font-medium text-slate-500 mb-2">Select a Topic</h3>
                <p className="text-slate-400">Choose a topic from the sidebar to view content</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`h-24 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedTopic === topic ? 'bg-slate-100' : ''
                }`}
              >
                <span 
                  className="transform -rotate-90 whitespace-nowrap text-slate-600 hover:text-blue-600 transition-colors"
                  style={{ transformOrigin: 'center' }}
                >
                  {topic}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;