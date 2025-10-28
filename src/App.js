import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/post/PostListPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WritePage from './pages/post/WritePage';
import PostPage from './pages/post/PostPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/posts/:username" element={<PostListPage />} />
      <Route path="/posts/:username/:postId" element={<PostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

/**
 * <Route path="/@:username">
 *   <Route index element={<PostListPage />} />
 *   <Route path=":postId" element={<PostPage />} />
 * </Route>
 *
 * <Route path="/posts" element={<PostListPage />} />
 * <Route path="/posts/:postId" element={<PostPage />} />
 */
