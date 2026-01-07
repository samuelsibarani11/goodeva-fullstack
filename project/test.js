const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body: body ? JSON.parse(body) : null }));
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function verify() {
  console.log('Verifying Todo API...');

  try {
    // 0. Test Unauthorized
    console.log('0. Testing Unauthorized Access...');
    const unauthorizedRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/todos',
      method: 'GET',
    });
    console.log('Unauthorized Response:', unauthorizedRes.statusCode);
    if (unauthorizedRes.statusCode !== 401) {
      throw new Error('Failed to block unauthorized access');
    }

    // 1. Create Todo
    console.log('1. Creating Todo...');
    const createRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/todos',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'user123' },
      },
      { title: 'Test Todo' },
    );
    console.log('Create Response:', createRes.statusCode, createRes.body);
    if (createRes.statusCode !== 201) throw new Error('Failed to create todo');
    const todoId = createRes.body.id;

    // 2. List Todos
    console.log('2. Listing Todos...');
    const listRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/todos',
      method: 'GET',
      headers: { 'x-user-id': 'user123' },
    });
    console.log('List Response:', listRes.statusCode, listRes.body);
    if (listRes.statusCode !== 200 || !listRes.body.find((t) => t.id === todoId)) {
      throw new Error('Failed to list todo');
    }

    // 3. Search Todo
    console.log('3. Searching Todo...');
    const searchRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/todos?search=Test',
      method: 'GET',
      headers: { 'x-user-id': 'user123' },
    });
    console.log('Search Response:', searchRes.statusCode, searchRes.body);
    if (searchRes.statusCode !== 200 || searchRes.body.length === 0) {
      throw new Error('Failed to search todo');
    }

    // 4. Toggle Todo
    console.log('4. Toggling Todo...');
    const toggleRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/todos/${todoId}`,
      method: 'PATCH',
      headers: { 'x-user-id': 'user123' },
    });
    console.log('Toggle Response:', toggleRes.statusCode, toggleRes.body);
    if (toggleRes.statusCode !== 200 || toggleRes.body.completed !== true) {
      throw new Error('Failed to toggle todo');
    }

    console.log('Verification Passed!');
  } catch (err) {
    console.error('Verification Failed:', err);
    process.exit(1);
  }
}

verify();
