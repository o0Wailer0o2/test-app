import { useState, useEffect } from 'react';
import HeroPost from '../components/HeroPost';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AdminPanel from '../components/AdminPanel';
import './Home.css';

function Home({ isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/posts?page=${currentPage}&limit=${postsPerPage}`);
        const data = await response.json();
        
        // Ensure we have valid data
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalPages(data.pagination?.pages || 1);
        } else {
          console.error('Invalid posts data:', data);
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts/categories');
        const data = await response.json();
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Categories API returned non-array data:', data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Use the first post as featured, or mock data if no posts
  const featuredPost = posts.length > 0 ? {
    id: posts[0].id,
    title: posts[0].title,
    excerpt: posts[0].excerpt,
    author: posts[0].author_name,
    date: new Date(posts[0].created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: posts[0].category,
    image: posts[0].image
  } : {
    id: 1,
    title: '10 Món Ăn Việt Nam Dễ Làm Cho Bữa Tối Gia Đình',
    excerpt: 'Khám phá những món ăn truyền thống Việt Nam vừa ngon miệng, vừa dễ thực hiện trong bếp nhà bạn. Từ canh chua đến thịt kho tàu, tất cả đều có thể làm chỉ trong vòng 30 phút.',
    author: 'Minh Anh',
    date: 'December 22, 2025',
    category: 'Nấu Ăn',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop'
  };

  // Exclude featured post from the grid (skip first post)
  const gridPosts = posts.slice(1).map(post => ({
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
      {/* Hero Section */}
      <section className="hero-section">
        <HeroPost post={featuredPost} />
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="content-wrapper">
          {/* Main Column */}
          <main className="main-content">
            <h2 className="section-title">Latest Posts</h2>
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
                  <div className="no-posts">No posts found</div>
                )}
              </>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>

          {/* Sidebar */}
          <aside className="sidebar-wrapper">
            <ProfileCard />
            {isAdmin && <AdminPanel isAdmin={isAdmin} />}
            <Sidebar categories={categories} onSearch={handleSearch} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;
