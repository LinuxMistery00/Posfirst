import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './styles.module.css';

function AddBlog() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
      });
      const data = await response.json();
      console.log('Blog adicionado com o ID: ' + data.id);
      setTitle('');
      setText('');
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar blog: ', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar users: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.Form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        /><br /><br /><br /><br />
        <textarea
          placeholder="Text"
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        /><br /><br />
        <button className={styles.AddBlogBTN} onClick={handleSubmit}>Add Blog</button>
        <div className={styles.Blogs}>
          {users.map((blog) => (
            <div key={blog.id}>
              <h1 className={styles.BlogTitle}>{blog.title}</h1><br />
              <h1>{blog.text}</h1><br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
