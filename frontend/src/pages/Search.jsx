import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AdminPanel from '../components/AdminPanel';
import './Home.css'; // Reuse Home.css for consistent styling

function Search({ isAdmin }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts/categories');
        const data = await response.json();
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setPosts([]);
        setTotalPages(1);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/posts/search?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${postsPerPage}`
        );
        const data = await response.json();
        
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalPages(data.pagination?.pages || 1);
        } else {
          console.error('Invalid search results data:', data);
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm) => {
    setSearchParams({ q: searchTerm });
    setCurrentPage(1);
  };

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

  return (
    <div className="home">
      {/* Main Content */}
      <div className="container">
        <div className="content-wrapper">
          {/* Main Column */}
          <main className="main-content">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Posts'}
            </h2>
            {loading ? (
              <div className="loading">Loading search results...</div>
            ) : (
              <>
                <div className="posts-grid">
                  {gridPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                {gridPosts.length === 0 && searchQuery && (
                  <div className="no-posts">
                    No posts found for &quot;{searchQuery}&quot;. Try searching with different keywords.
                  </div>
                )}
                {gridPosts.length === 0 && !searchQuery && (
                  <div className="no-posts">
                    Enter a search term to find posts.
                  </div>
                )}
              </>
            )}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
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

export default Search;
