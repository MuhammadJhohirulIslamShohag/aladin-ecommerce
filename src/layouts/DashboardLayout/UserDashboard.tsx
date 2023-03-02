import UserSideBar from '@/components/Dashboard/User/UserSideBar/UserSideBar';
import Footer from '@/components/Footer/Footer';
import NavbarMiddle from '@/components/Navbar/NavbarMiddle/NavbarMiddle';
import NavbarTop from '@/components/Navbar/NavbarTop/NavbarTop';
import React from 'react';


const UserDashboard = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
           <header>
		   	<NavbarTop />
            <NavbarMiddle />		
			</header>
            <main>
				<section className='container mt-8'>
					<div className='grid grid-cols-12'>
						<div className="col-span-3">
							<UserSideBar/>
						</div>
						<div className="col-span-8">
							{children}
						</div>
					</div>
				</section>
			</main>
            <Footer />
        </>
    );
};

export default UserDashboard;