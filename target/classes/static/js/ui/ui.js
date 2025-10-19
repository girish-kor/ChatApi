function formatChatMessage(message){if(!message||!message.content)return'No content available';return`<div style="padding: 12px; border-radius: 8px; background: #f9f2eb; margin-bottom: 8px; border: 1px solid #d9c2a6; color: #4a3728;"><strong>From:</strong> ${message.fromSessionId}<br><strong>To:</strong> ${message.toSessionId}<br><strong>Message:</strong> ${message.content}<br><strong>Time:</strong> ${new Date(message.timestamp).toLocaleString()}</div>`}

function formatQueueUser(user){if(!user||!user.sessionId)return'No user data available';return`<div style="padding: 12px; border-radius: 8px; background: #f9f2eb; margin-bottom: 8px; border: 1px solid #d9c2a6; color: #4a3728;"><strong>Session ID:</strong> ${user.sessionId}<br><strong>Matched:</strong> ${user.matched?'Yes':'No'}<br></div>`}

function formatSession(session){if(!session||!session.id)return'No session data available';return`<div style="padding: 12px; border-radius: 8px; background: #f9f2eb; margin-bottom: 8px; border: 1px solid #d9c2a6; color: #4a3728;"><strong>Session ID:</strong> ${session.id}<br><strong>User 1:</strong> ${session.userSessionId1}<br><strong>User 2:</strong> ${session.userSessionId2}<br><strong>Active:</strong> ${session.active?'Yes':'No'}<br></div>`}

function updateInputFields(ids,value){ids.forEach(id=>{const input=document.getElementById(id);if(input)input.value=value})}

export{formatChatMessage,formatQueueUser,formatSession,updateInputFields};
