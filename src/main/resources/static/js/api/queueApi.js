import { SERVER_URL, MOCK_MODE, generateUUID } from '../utils/utils.js';const mockQueueUsers=MOCK_MODE?[{sessionId:'mock-queue-1',matched:false},{sessionId:'mock-queue-2',matched:false}]:[];

async function postQueue(sessionId){if(MOCK_MODE){const user={sessionId,matched:false};mockQueueUsers.push(user);return{data:user,updateIds:['queue-get-session','queue-put-session','queue-delete-session'],newId:sessionId};}const r=await fetch(`${SERVER_URL}/api/queue`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId}),credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);const d=await r.json();return{data:d,updateIds:['queue-get-session','queue-put-session','queue-delete-session'],newId:d.sessionId};}

async function getQueue(sessionId){if(MOCK_MODE)return mockQueueUsers.find(u=>u.sessionId===sessionId)||mockQueueUsers[0]||{sessionId:'Not found'};const r=await fetch(`${SERVER_URL}/api/queue/${sessionId}`,{method:'GET',credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function getAllQueues(){if(MOCK_MODE)return mockQueueUsers;const r=await fetch(`${SERVER_URL}/api/queue`,{method:'GET',credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function putQueue(sessionId,matched){if(MOCK_MODE){const i=mockQueueUsers.findIndex(u=>u.sessionId===sessionId);if(i===-1)throw new Error('Queue user not found');const u={sessionId,matched};mockQueueUsers[i]=u;return u;}const r=await fetch(`${SERVER_URL}/api/queue/${sessionId}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId,matched}),credentials:'include'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json();}

async function deleteQueue(sessionId){if(MOCK_MODE){const i=mockQueueUsers.findIndex(u=>u.sessionId===sessionId);if(i!==-1){mockQueueUsers.splice(i,1);return'Deleted successfully';}return'Queue user not found';}const r=await fetch(`${SERVER_URL}/api/queue/${sessionId}`,{method:'DELETE',credentials:'include'});return r.ok?'Deleted successfully':`Failed to delete (HTTP ${r.status})`; }

async function getRandomQueueSessionId(excludeSessionId=''){if(MOCK_MODE){const f=mockQueueUsers.filter(u=>u.sessionId!==excludeSessionId);return f.length>0?f[Math.floor(Math.random()*f.length)].sessionId:generateUUID();}try{const r=await fetch(`${SERVER_URL}/api/queue`,{method:'GET',credentials:'include'});if(!r.ok)return generateUUID();const q=await r.json();const f=q.filter(u=>u.sessionId!==excludeSessionId);if(f.length===0)return generateUUID();return f[Math.floor(Math.random()*f.length)].sessionId;}catch(e){return generateUUID();}}

async function getRandomQueueSessionIds(){if(MOCK_MODE)return mockQueueUsers.length>=2?[mockQueueUsers[0].sessionId,mockQueueUsers[1].sessionId]:[generateUUID(),generateUUID()];try{const r=await fetch(`${SERVER_URL}/api/queue`,{method:'GET',credentials:'include'});if(!r.ok)return[generateUUID(),generateUUID()];const q=await r.json();if(q.length<2)return[generateUUID(),generateUUID()];const s=q.sort(()=>0.5-Math.random());return[s[0].sessionId,s[1].sessionId];}catch(e){return[generateUUID(),generateUUID()];}}

export { postQueue, getQueue, getAllQueues, putQueue, deleteQueue, getRandomQueueSessionId, getRandomQueueSessionIds };
