const API_URL='http://localhost:5000/api';

export async function askGreenLeafAI(message,plantName='',cart=[]){
  const r=await fetch(`${API_URL}/ai/chat`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message,plantName,cart})
  });
  const data=await r.json();
  if(!r.ok) throw new Error(data.message||'AI request failed');
  return data;
}

export async function getAIRecommendations(goal,light,budget){
  const r=await fetch(`${API_URL}/ai/recommend`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({goal,light,budget})
  });
  const data=await r.json();
  if(!r.ok) throw new Error(data.message||'Recommendation failed');
  return data;
}
