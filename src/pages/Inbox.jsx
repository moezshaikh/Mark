
import '../styles/Inbox.css';
import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  MoreHorizontal,
  Paperclip,
  Send,
  ChevronLeft
} from 'lucide-react';


const Inbox = () => {
  const [activeTab, setActiveTab] = useState('gmail');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for different services
  const messageData = {
  gmail: [
    {
      id: 1,
      sender: 'Priya Sharma',
      email: 'priya.sharma@marketinghub.in',
      subject: 'Campaign Update - Diwali Promotions',
      preview: 'Hi team, here are the final updates for our Diwali promotional campaign...',
      time: '2:30 PM',
      date: 'Today',
      unread: true,
      starred: false,
      body: `Hi team,

I wanted to share the latest updates for our Diwali promotional campaign. The creative designs and ad copies have been finalized, and the social media schedule is ready.

Key Updates:
• Creatives approved by client
• Influencer list finalized
• Launch date: 28th October

Please review the attached designs and confirm by tomorrow.

Best regards,
Priya Sharma
Marketing Manager`
    },
    {
      id: 2,
      sender: 'Google Meet',
      email: 'noreply@meet.google.com',
      subject: 'Meeting Reminder: Product Review Call',
      preview: 'Your meeting "Product Review Call" is starting in 10 minutes...',
      time: '1:45 PM',
      date: 'Today',
      unread: true,
      starred: true,
      body: `Meeting Reminder

Your meeting "Product Review Call" is starting in 10 minutes.

Meeting Details:
• Time: 2:00 PM - 2:30 PM
• Organizer: Raj Patel
• Participants: 6 members

Join here: https://meet.google.com/join-meeting

Best,
Google Meet`
    },
    {
      id: 3,
      sender: 'Aman Verma',
      email: 'aman.verma@techvista.in',
      subject: 'Code Review Needed - Payment Gateway Module',
      preview: 'Hey, could you review my PR for the Razorpay integration?',
      time: '11:20 AM',
      date: 'Today',
      unread: false,
      starred: false,
      body: `Hey,

Could you please review my pull request for the payment gateway module? I’ve integrated Razorpay and added unit tests.

Updates:
• Razorpay API integration
• Error handling improvements
• Transaction logs feature
• Security patch applied

PR Link: https://github.com/techvista/repo/pull/102

Thanks,
Aman`
    }
  ],
  whatsapp: [
    {
      id: 4,
      sender: 'Maa',
      email: '+91 98765 43210',
      subject: 'Beta, dinner yaad hai na?',
      preview: 'Beta, don’t forget about dinner tonight! Papa has got sweets...',
      time: '8:10 PM',
      date: 'Today',
      unread: true,
      starred: false,
      body: `Beta ❤️

Don’t forget dinner tonight! I made your favourite Paneer Butter Masala and Papa brought gulab jamuns 🍮

Come home soon!

Love,
Maa`
    },
    {
      id: 5,
      sender: 'Project Team',
      email: 'Team Chat',
      subject: 'New message in Project Team',
      preview: 'Riya: Guys, client call at 10 AM tomorrow, please be ready...',
      time: '7:45 PM',
      date: 'Today',
      unread: true,
      starred: true,
      body: `Project Team Chat

Riya: Guys, client call at 10 AM tomorrow, please be ready with reports.
Arjun: Got it, will send updates by 9 AM.
Karan: Presentation slides done, uploading now.
Riya: Great teamwork everyone! 🙌`
    }
  ],
  outlook: [
    {
      id: 6,
      sender: 'HR Department',
      email: 'hr@infotechsolutions.in',
      subject: 'Performance Review Meeting - Reminder',
      preview: 'This is a reminder for your upcoming annual performance review...',
      time: '10:00 AM',
      date: 'Today',
      unread: false,
      starred: false,
      body: `Dear Employee,

This is a friendly reminder for your annual performance review meeting scheduled next week.

Please prepare:
• Your achievements summary
• Plans for next quarter
• Team feedback

Meeting Date: 15th October, 2:00 PM  
Venue: HR Conference Room  

If you need to reschedule, contact HR.

Warm regards,  
HR Department  
Infotech Solutions`
    }
  ]
};

  const tabs = [
    { id: 'gmail', name: 'Gmail', color: '#dc2626' },
    { id: 'whatsapp', name: 'WhatsApp', color: '#16a34a' },
    { id: 'outlook', name: 'Outlook', color: '#2563eb' }
  ];

  const currentMessages = messageData[activeTab] || [];
  const filteredMessages = currentMessages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
      setShowReply(false);
    }
  };

  const formatTime = (time, date) => {
    if (date === 'Today') return time;
    return `${date} ${time}`;
  };

  return (
    <div className="inbox-container">
      {/* Header */}
      <header className="inbox-header">
        <h1>Inbox</h1>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedMessage(null);
              setShowReply(false);
            }}
            style={{
              '--tab-color': tab.color
            }}
          >
            {tab.name}
            <span className="message-count">
              {messageData[tab.id]?.filter(m => m.unread).length || 0}
            </span>
          </button>
        ))}
      </div>

      <div className="inbox-content">
        {/* Message List */}
        <div className="message-list">
          {filteredMessages.length === 0 ? (
            <div className="empty-state">
              <p>No messages found</p>
            </div>
          ) : (
            filteredMessages.map(message => (
              <div
                key={message.id}
                className={`message-item ${selectedMessage?.id === message.id ? 'active' : ''} ${message.unread ? 'unread' : ''}`}
                onClick={() => {
                  setSelectedMessage(message);
                  setShowReply(false);
                }}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <span className="sender-name">{message.sender}</span>
                    {message.starred && <Star className="star-icon" size={14} />}
                  </div>
                  <span className="message-time">{message.time}</span>
                </div>
                <div className="message-subject">{message.subject}</div>
                <div className="message-preview">{message.preview}</div>
              </div>
            ))
          )}
        </div>

        {/* Message View */}
        <div className="message-view">
          {selectedMessage ? (
            <>
              <div className="message-header-detail">
                <div className="back-button-mobile">
                  <button 
                    className="back-btn"
                    onClick={() => setSelectedMessage(null)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
                <div className="message-info">
                  <h2>{selectedMessage.subject}</h2>
                  <div className="sender-details">
                    <span className="sender">{selectedMessage.sender}</span>
                    <span className="email">&lt;{selectedMessage.email}&gt;</span>
                    <span className="timestamp">{formatTime(selectedMessage.time, selectedMessage.date)}</span>
                  </div>
                </div>
                <div className="message-actions">
                  <button className="action-btn" title="Star">
                    <Star size={18} />
                  </button>
                  <button className="action-btn" title="Archive">
                    <Archive size={18} />
                  </button>
                  <button className="action-btn" title="Delete">
                    <Trash2 size={18} />
                  </button>
                  <button className="action-btn" title="More">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              <div className="message-body">
                <div className="message-content">
                  {selectedMessage.body.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="message-footer">
                <button 
                  className="reply-btn"
                  onClick={() => setShowReply(!showReply)}
                >
                  <Reply size={18} />
                  Reply
                </button>
                <button className="forward-btn">
                  <Forward size={18} />
                  Forward
                </button>
              </div>

              {showReply && (
                <div className="reply-container">
                  <div className="reply-header">
                    <h3>Reply to {selectedMessage.sender}</h3>
                  </div>
                  <div className="reply-compose">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="reply-textarea"
                      rows={6}
                    />
                    <div className="reply-actions">
                      <button className="attach-btn" title="Attach file">
                        <Paperclip size={18} />
                      </button>
                      <div className="reply-buttons">
                        <button 
                          className="cancel-btn"
                          onClick={() => {
                            setShowReply(false);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </button>
                        <button 
                          className="send-btn"
                          onClick={handleReply}
                          disabled={!replyText.trim()}
                        >
                          <Send size={18} />
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-message-view">
              <h3>Select a message to view</h3>
              <p>Choose a message from the list to read its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;