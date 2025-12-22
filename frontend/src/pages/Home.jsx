import { useState } from 'react';
import HeroPost from '../components/HeroPost';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AdminPanel from '../components/AdminPanel';
import './Home.css';

function Home({ isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Mock data for demonstration
  const featuredPost = {
    id: 1,
    title: '10 Món Ăn Việt Nam Dễ Làm Cho Bữa Tối Gia Đình',
    excerpt: 'Khám phá những món ăn truyền thống Việt Nam vừa ngon miệng, vừa dễ thực hiện trong bếp nhà bạn. Từ canh chua đến thịt kho tàu, tất cả đều có thể làm chỉ trong vòng 30 phút.',
    author: 'Minh Anh',
    date: 'December 22, 2025',
    category: 'Nấu Ăn',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop'
  };

  const posts = [
    {
      id: 2,
      title: 'Cách Làm Bánh Mì Việt Nam Tại Nhà Đơn Giản',
      excerpt: 'Hướng dẫn chi tiết cách làm bánh mì Việt Nam giòn tan với nhân thịt nguội, pate, và rau thơm. Bí quyết làm vỏ bánh mì thơm ngon như ngoài tiệm.',
      author: 'Thu Hương',
      date: 'December 20, 2025',
      category: 'Nấu Ăn',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Bài Tập Yoga Buổi Sáng Cho Sức Khỏe Dẻo Dai',
      excerpt: 'Khám phá 5 động tác yoga đơn giản giúp khởi động cơ thể, tăng cường sức khỏe và tinh thần tốt hơn mỗi buổi sáng chỉ trong 15 phút.',
      author: 'Tuấn Anh',
      date: 'December 18, 2025',
      category: 'Thể Thao',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Mẹo Sắp Xếp Tủ Quần Áo Gọn Gàng và Khoa Học',
      excerpt: 'Chia sẻ những mẹo hay giúp tủ quần áo của bạn luôn gọn gàng, dễ tìm kiếm và tiết kiệm không gian. Áp dụng phương pháp KonMari hiệu quả.',
      author: 'Lan Anh',
      date: 'December 15, 2025',
      category: 'Cuộc Sống',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Top 5 Điểm Du Lịch Miền Bắc Không Thể Bỏ Qua',
      excerpt: 'Khám phá vẻ đẹp hùng vĩ của miền Bắc Việt Nam với 5 điểm đến tuyệt vời: Hạ Long, Sapa, Ninh Bình, Hà Giang và Mai Châu. Hướng dẫn chi tiết cho chuyến đi.',
      author: 'Hoàng Nam',
      date: 'December 12, 2025',
      category: 'Du Lịch',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Mẹo Tiết Kiệm Điện Trong Gia Đình Hiệu Quả',
      excerpt: 'Những cách đơn giản giúp giảm thiểu hóa đơn tiền điện hàng tháng mà vẫn đảm bảo sinh hoạt thoải mái. Tiết kiệm đến 30% chi phí điện năng.',
      author: 'Minh Hà',
      date: 'December 10, 2025',
      category: 'Mẹo Vặt',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Chạy Bộ Mỗi Ngày: Lợi Ích và Cách Tập Đúng',
      excerpt: 'Tìm hiểu về những lợi ích tuyệt vời của việc chạy bộ đều đặn và cách thực hiện bài tập chạy bộ đúng kỹ thuật để tránh chấn thương và đạt hiệu quả cao nhất.',
      author: 'Đức Minh',
      date: 'December 8, 2025',
      category: 'Thể Thao',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop'
    }
  ];

  const categories = [
    { id: 1, name: 'Nấu Ăn', slug: 'nau-an', count: 15 },
    { id: 2, name: 'Thể Thao', slug: 'the-thao', count: 12 },
    { id: 3, name: 'Cuộc Sống', slug: 'cuoc-song', count: 18 },
    { id: 4, name: 'Mẹo Vặt', slug: 'meo-vat', count: 10 },
    { id: 5, name: 'Du Lịch', slug: 'du-lich', count: 14 },
    { id: 6, name: 'Sức Khỏe', slug: 'suc-khoe', count: 8 }
  ];

  const user = {
    name: 'Minh Anh',
    role: 'Blogger & Content Creator',
    bio: 'Chia sẻ kinh nghiệm sống, nấu ăn và du lịch. Yêu thích khám phá văn hóa Việt Nam và phong cách sống hiện đại.',
    avatar: 'https://ui-avatars.com/api/?name=Minh+Anh&size=200&background=3498db&color=fff',
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
