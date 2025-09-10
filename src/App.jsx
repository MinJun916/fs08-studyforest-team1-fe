import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import Workshop from '@/pages/Workshop_seungjeon.jsx';
import Focus from '@pages/Focus.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import EmojiList from '@components/emoji/EmojiList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="study">
          <Route path="new" element={<CreateStudyPage />} />
          <Route path=":studyId" element={<DetailStudyPage />} />
        </Route>

        <Route path="habit">
          <Route path=":studyId" element={<Workshop />} />
        </Route>

        <Route path="focus">
          <Route path=":studyId" element={<Focus />} />
        </Route>

        {/* 참조용으로 추가한거에요 나중에 삭제하시면 됩니다. */}
        <Route
          path="emoji"
          element={
            <EmojiList
              emojis={[
                {
                  id: '550e8400-e29b-41d4-a716-446655440000',
                  studyId: '5f7d8c9a-1234-4bcd-9ef0-abcdef123456',
                  emojiType: '👍',
                  count: 5,
                  createdAt: '2025-01-07T10:30:00.000Z',
                  updatedAt: '2025-01-07T15:45:00.000Z',
                },
                {
                  id: '550e8400-e29b-41d4-a716-446655440001',
                  studyId: '5f7d8c9a-1234-4bcd-9ef0-abcdef123456',
                  emojiType: '❤️',
                  count: 3,
                  createdAt: '2025-01-07T11:30:00.000Z',
                  updatedAt: '2025-01-07T16:45:00.000Z',
                },
                {
                  id: '550e8400-e29b-41d4-a716-446655440002',
                  studyId: '5f7d8c9a-1234-4bcd-9ef0-abcdef123456',
                  emojiType: '🎉',
                  count: 8,
                  createdAt: '2025-01-07T12:30:00.000Z',
                  updatedAt: '2025-01-07T17:45:00.000Z',
                },
                {
                  id: '550e8400-e29b-41d4-a716-446655440003',
                  studyId: '5f7d8c9a-1234-4bcd-9ef0-abcdef123456',
                  emojiType: '😊',
                  count: 2,
                  createdAt: '2025-01-07T13:30:00.000Z',
                  updatedAt: '2025-01-07T18:45:00.000Z',
                },
                {
                  id: '550e8400-e29b-41d4-a716-446655440004',
                  studyId: '5f7d8c9a-1234-4bcd-9ef0-abcdef123456',
                  emojiType: '🔥',
                  count: 6,
                  createdAt: '2025-01-07T14:30:00.000Z',
                  updatedAt: '2025-01-07T19:45:00.000Z',
                },
              ]}
              onSelect={(emoji) => console.log('Selected emoji:', emoji)}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
