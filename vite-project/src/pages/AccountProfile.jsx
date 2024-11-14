import React from 'react';
import AccountProfileSection from '../components/AccountProfileSection';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../assets/styles/AccountProfile.css';

function AccountProfile() {
    return (
        <div className="profile-pages-container">
            <Header2 />
            <div className="main-content">
                <AccountProfileSection />
            </div>
            <Footer />
        </div>
    );
}

export default AccountProfile;
