import React from 'react';
import AccountProfileSection from '../../components/pages/AccountProfileSection';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';
import '../../assets/styles/AccountProfile/AccountProfile.css';

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
