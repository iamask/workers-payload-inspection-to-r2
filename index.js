export default {
  async fetch(request, env, ctx) {
    if (request.method === 'POST') {
      const requestBody = await request.text();

      // Define a regex pattern for Indian PAN
      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

      // Check if the PAN regex pattern is matched in the request body
      if (panRegex.test(requestBody)) {
    
        // console.log(' PAN detected in the request body:', requestBody);

        // Modify the request with the updated body
        request = new Request(request, {
          body: requestBody
        });
        
        console.log(requestBody)

        // Store the payload R2
       await env.MY_BUCKET.put(`paninspection/${Date.now()}.txt`, requestBody);
      }
    }

    // Forward the modified request to the origin server
    const response = await fetch(request);
    return response;
  }
};
