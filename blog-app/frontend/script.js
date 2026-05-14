const API = 'http://localhost:5000/api/posts';

async function fetchPosts() {
  const res = await fetch(API);
  const data = await res.json();

  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  data.forEach(post => {
    postsDiv.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
  });
}

async function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  });

  fetchPosts();
}

async function deletePost(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  fetchPosts();
}

fetchPosts();
