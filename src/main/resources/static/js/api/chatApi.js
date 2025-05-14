import { SERVER_URL, MOCK_MODE, generateUUID } from '../utils/utils.js';const mockMessages=MOCK_MODE?[{id:'mock-message-1',fromSessionId:'mock-queue-1',toSessionId:'mock-queue-2',content:'Test message',timestamp:new Date().toISOString()}]:[];

async function postChat(fromSessionId,toSessionId,content){if(MOCK_MODE){const m={id:`mock-message-${Math.floor(Math.random()*1000)}`,fromSessionId,toSessionId,content,timestamp:new Date().toISOString()};mockMessages.push(m);return{data:m,updateIds:['chat-get-id','chat-put-id','chat-delete-id'],newId:m.id};}const r=await fetch(`${SERVER_URL}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fromSessionId,toSessionId,content}),credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);const d=await r.json();return{data:d,updateIds:['chat-get-id','chat-put-id','chat-delete-id'],newId:d.id};}

async function getChat(id){if(MOCK_MODE)return mockMessages.find(m=>m.id===id)||mockMessages[0]||{content:'Message not found'};const r=await fetch(`${SERVER_URL}/api/chat/${id}`,{method:'GET',credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function getAllChats(){if(MOCK_MODE)return mockMessages;const r=await fetch(`${SERVER_URL}/api/chat`,{method:'GET',credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function putChat(id,fromSessionId,toSessionId,content){if(MOCK_MODE){const i=mockMessages.findIndex(m=>m.id===id);if(i===-1)throw new Error('Message not found');const u={id,fromSessionId,toSessionId,content,timestamp:new Date().toISOString()};mockMessages[i]=u;return u;}const r=await fetch(`${SERVER_URL}/api/chat/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,fromSessionId,toSessionId,content}),credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function deleteChat(id){if(MOCK_MODE){const i=mockMessages.findIndex(m=>m.id===id);if(i!==-1){mockMessages.splice(i,1);return'Deleted successfully';}return'Message not found';}const r=await fetch(`${SERVER_URL}/api/chat/${id}`,{method:'DELETE',credentials:'include'});return r.ok?'Deleted successfully':`Failed to delete (HTTP ${r.status})`; }

async function getChatHistory(sessionId1,sessionId2){if(MOCK_MODE)return mockMessages.filter(m=>(m.fromSessionId===sessionId1&&m.toSessionId===sessionId2)||(m.fromSessionId===sessionId2&&m.toSessionId===sessionId1));const r=await fetch(`${SERVER_URL}/api/chat/history?sessionId1=${sessionId1}&sessionId2=${sessionId2}`,{method:'GET',credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function getRandomMessageId(){if(MOCK_MODE)return mockMessages.length>0?mockMessages[Math.floor(Math.random()*mockMessages.length)].id:generateUUID();try{const r=await fetch(`${SERVER_URL}/api/chat`,{method:'GET',credentials:'include'});if(!r.ok)return generateUUID();const m=await r.json();if(m.length===0)return generateUUID();return m[Math.floor(Math.random()*m.length)].id;}catch(e){return generateUUID();}}

export { postChat, getChat, getAllChats, putChat, deleteChat, getChatHistory, getRandomMessageId };
