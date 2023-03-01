import UserSideBar from '@/components/Dashboard/User/UserSideBar/UserSideBar';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';


const UserDashboard = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
           <header>
				<Navbar/>			
			</header>
            <main>
				<section className='container'>
					<div className='grid grid-cols-12'>
						<div >
							<UserSideBar/>
						</div>
						<div>
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