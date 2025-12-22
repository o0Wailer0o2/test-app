import { useState } from 'react';
import HeroPost from '../components/HeroPost';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AdminPanel from '../components/AdminPanel';
import './Home.css';

function Home({ isLoggedIn, isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Mock data for demonstration
  const featuredPost = {
    id: 1,
    title: 'Welcome to My Personal Blog',
    excerpt: 'Discover amazing articles, insights, and stories from our community of writers. Join us on a journey through technology, creativity, and innovation.',
    author: 'John Doe',
    date: 'December 22, 2025',
    category: 'Featured',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop'
  };

  const posts = [
    {
      id: 2,
      title: 'Getting Started with React 19',
      excerpt: 'Learn the latest features and improvements in React 19 and how to leverage them in your projects.',
      author: 'Jane Smith',
      date: 'December 20, 2025',
      category: 'React',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Node.js Best Practices for 2025',
      excerpt: 'Explore the best practices and patterns for building scalable Node.js applications in 2025.',
      author: 'Mike Johnson',
      date: 'December 18, 2025',
      category: 'Node.js',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'MySQL Performance Optimization Tips',
      excerpt: 'Boost your database performance with these essential MySQL optimization techniques.',
      author: 'Sarah Wilson',
      date: 'December 15, 2025',
      category: 'Database',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Building RESTful APIs with Express',
      excerpt: 'A comprehensive guide to creating robust and scalable REST APIs using Express.js.',
      author: 'John Doe',
      date: 'December 12, 2025',
      category: 'Backend',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Modern CSS Techniques for 2025',
      excerpt: 'Discover the latest CSS features and techniques to create stunning web designs.',
      author: 'Emily Brown',
      date: 'December 10, 2025',
      category: 'CSS',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'JavaScript Design Patterns',
      excerpt: 'Master common design patterns in JavaScript to write cleaner and more maintainable code.',
      author: 'David Lee',
      date: 'December 8, 2025',
      category: 'JavaScript',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop'
    }
  ];

  const categories = [
    { id: 1, name: 'React', slug: 'react', count: 12 },
    { id: 2, name: 'Node.js', slug: 'nodejs', count: 8 },
    { id: 3, name: 'Database', slug: 'database', count: 15 },
    { id: 4, name: 'Backend', slug: 'backend', count: 10 },
    { id: 5, name: 'CSS', slug: 'css', count: 7 },
    { id: 6, name: 'JavaScript', slug: 'javascript', count: 20 }
  ];

  const user = {
    name: 'John Doe',
    role: 'Full Stack Developer',
    bio: 'Passionate writer sharing insights on technology, programming, and life experiences.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=3498db&color=fff',
    postCount: 42,
    followers: 1.2
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
            <div className="posts-grid">
              {currentPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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

export default Home;
