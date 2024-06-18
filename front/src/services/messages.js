export async function sendMessageToServer(message) {
  try {
    const response = await fetch('http://localhost:5000/receive-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

function manchesterEncode(bits) {
  let encoded = '';
  
  for (let i = 0; i < bits.length; i++) {
      if (bits[i] === '0') {
          encoded += '10';
      } else if (bits[i] === '1') {
          encoded += '01';
      } else {
          throw new Error("A sequência de bits deve conter apenas '0' e '1'");
      }
  }
  
  return encoded;
}