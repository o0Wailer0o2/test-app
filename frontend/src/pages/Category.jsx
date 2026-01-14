import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AdminPanel from '../components/AdminPanel';
import './Home.css';

function Category({ isAdmin }) {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts/categories');
        const data = await response.json();
        setCategories(data || []);
        
        // Find the category name from slug
        const category = data.find(cat => cat.slug === slug);
        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [slug]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Convert slug to category name for filtering
        const category = categories.find(cat => cat.slug === slug);
        const categoryFilter = category ? category.name : '';
        
        const response = await fetch(
          `http://localhost:3000/api/posts?page=${currentPage}&limit=${postsPerPage}&category=${encodeURIComponent(categoryFilter)}`
        );
        const data = await response.json();
        
        setPosts(data.posts || []);
        setTotalPages(data.pagination?.pages || 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchPosts();
    }
  }, [currentPage, slug, categories]);

  const gridPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author_name,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: post.category,
    image: post.image
  }));

  const user = {
    name: 'Sarah Johnson',
    role: 'Blogger & Content Creator',
    bio: 'Sharing delicious recipes and cooking tips for home cooks.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=3498db&color=fff',
    postCount: 42,
    followers: 1.2
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  return (
    <div className="home">
      {/* Category Header */}
      <section className="category-header" style={{
        padding: '60px 0 40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            {categoryName || 'Category'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="content-wrapper">
          {/* Main Column */}
          <main className="main-content">
            {loading ? (
              <div className="loading">Loading posts...</div>
            ) : (
              <>
                <div className="posts-grid">
                  {gridPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                {gridPosts.length === 0 && (
                  <div className="no-posts">No posts found in this category</div>
                )}
              </>
            )}
            {gridPosts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>

          {/* Sidebar */}
          <aside className="sidebar-wrapper">
            <ProfileCard user={user} />
            {isAdmin && <AdminPanel isAdmin={isAdmin} />}
            <Sidebar categories={categories} onSearch={handleSearch} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Category;
