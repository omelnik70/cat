import { Routes, Route } from 'react-router-dom';

import Content from '../components/Content';
import Error from '../pages/Error';
import Login from '../pages/Form/Login';
import Register from '../pages/Form/Register';
import Pages from '../pages';

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/privacy_policy" element={<Pages />} />
            <Route path="/about" element={<Pages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:category" element={<Content />} />
            <Route path="/:category/:post" element={<Content />} />
            <Route path="/users/:id" element={<Content />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default Routing;