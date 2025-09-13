
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
        sender: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        subject: 'Project Update - Q4 Marketing Campaign',
        preview: 'Hi team, I wanted to share the latest updates on our Q4 marketing campaign...',
        time: '2:30 PM',
        date: 'Today',
        unread: true,
        starred: false,
        body: `Hi team,

I wanted to share the latest updates on our Q4 marketing campaign. We've made significant progress on the creative assets and have received positive feedback from the stakeholders.

Key Updates:
• Creative concepts approved
• Budget allocation finalized
• Timeline confirmed for December launch

Please review the attached documents and let me know if you have any questions.

Best regards,
Sarah Johnson
Marketing Director`
      },
      {
        id: 2,
        sender: 'Microsoft Teams',
        email: 'noreply@teams.microsoft.com',
        subject: 'Meeting Reminder: Weekly Standup',
        preview: 'Your meeting "Weekly Standup" is starting in 15 minutes...',
        time: '1:45 PM',
        date: 'Today',
        unread: true,
        starred: true,
        body: `Meeting Reminder

Your meeting "Weekly Standup" is starting in 15 minutes.

Meeting Details:
• Time: 2:00 PM - 2:30 PM
• Organizer: John Smith
• Participants: 8 people

Join the meeting: https://teams.microsoft.com/join-meeting

Best regards,
Microsoft Teams`
      },
      {
        id: 3,
        sender: 'David Chen',
        email: 'david.chen@techcorp.com',
        subject: 'Code Review Request',
        preview: 'Could you please review my pull request for the user authentication module?',
        time: '11:20 AM',
        date: 'Today',
        unread: false,
        starred: false,
        body: `Hi there,

Could you please review my pull request for the user authentication module? I've implemented the OAuth integration and added comprehensive tests.

Changes include:
• OAuth 2.0 implementation
• Unit tests for auth flow
• Error handling improvements
• Security enhancements

Link: https://github.com/company/repo/pull/456

Thanks!
David`
      }
    ],
    whatsapp: [
      {
        id: 4,
        sender: 'Mom',
        email: '+1 (555) 123-4567',
        subject: 'Don\'t forget dinner tonight!',
        preview: 'Hi honey, just reminding you about family dinner at 7 PM...',
        time: '3:15 PM',
        date: 'Today',
        unread: true,
        starred: false,
        body: `Hi honey! 👋

Just reminding you about family dinner tonight at 7 PM. I'm making your favourite Biryani.!

Don't be late! Love you ❤️

Mom`
      },
      {
        id: 5,
        sender: 'Work Group',
        email: 'Work Team Chat',
        subject: 'New message in Work Group',
        preview: 'Alex: The presentation looks great! When do we present?',
        time: '2:50 PM',
        date: 'Today',
        unread: true,
        starred: true,
        body: `Work Group Chat

Alex Thompson: The presentation looks great! When do we present to the client?

Lisa Wong: Tomorrow at 10 AM

Mike Davis: I'll send the final slides tonight

Alex Thompson: Perfect, thanks team! 👍`
      }
    ],
    outlook: [
      {
        id: 6,
        sender: 'HR Department',
        email: 'hr@company.com',
        subject: 'Annual Performance Review Reminder',
        preview: 'This is a friendly reminder that your annual performance review...',
        time: '9:30 AM',
        date: 'Today',
        unread: false,
        starred: false,
        body: `Dear Employee,

This is a friendly reminder that your annual performance review is scheduled for next week.

Please prepare:
• Self-assessment form
• Goals for next year
• Feedback on team processes

Meeting scheduled: Next Tuesday, 2:00 PM
Location: Conference Room A

If you have any questions, please contact HR.

Best regards,
HR Department`
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