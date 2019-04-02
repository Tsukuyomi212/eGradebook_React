import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const SchoolGradeOptions = () => {
    return (
        <div>
            <Header />
            <div>
            <Link to='/admin/schoolgrades/schoolclasses'>School Classes</Link>
            <br />
            <Link to='/admin/schoolgrades/courses'>Courses</Link>
            </div>
            <button>Back</button>
            <Footer />
        </div>
    )
}

export default SchoolGradeOptions;