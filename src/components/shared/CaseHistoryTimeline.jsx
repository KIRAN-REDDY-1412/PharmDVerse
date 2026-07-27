import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';
import './CaseHistoryTimeline.css';

const CaseHistoryTimeline = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="case-history-container">
      <h3 className="history-title">Case History</h3>
      <div className="timeline">
        {history.map((event, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-action">{event.action}</span>
                <span className="timeline-date">
                  <Clock size={12} /> {new Date(event.date).toLocaleString()}
                </span>
              </div>
              <div className="timeline-user">
                <User size={12} /> {event.user}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseHistoryTimeline;
