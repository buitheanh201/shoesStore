import React from 'react';
import Header from '@/pages/Admin/components/Header';
import Nav from '@/pages/Admin/components/Navigation';
import { Switch, Route } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import ManagerProduct from '@/pages/ManagerProduct';
import ManagerAccount from '@/pages/ManagerAccount';
import DashBoard from '@/pages/Admin';
import AddProduct from '@/pages/ManagerProduct/components/AddProduct';
import Category from '@/pages/ManagerCategories';
import AddCategory from '@/pages/ManagerCategories/components/AddCategory';
import Edit from '@/pages/ManagerProduct/components/EditProduct';
import EditCategory from '@/pages/ManagerCategories/components/EditCategory';

function AdminRoute() {

    return (
        <div>
            <div className='flex'>
                <Nav />
                <div className='main__content w-4/5 overflow-x-hidden'>
                    <div>
                        <Header />
                    </div>
                    <div className='main__admin'>
                        <Switch>
                            <Route path = {PATH.EDIT_CATEGORY} component = {EditCategory} />
                            <Route path = {PATH.EDIT_PRODUCT} component = {Edit} />
                            <Route path={PATH.ADD_CATEGORY} component={AddCategory} />
                            <Route path={PATH.MANAGER_CATEGORY} component={Category} />
                            <Route path={PATH.ADD_PRODUCT} component={AddProduct} />
                            <Route path={PATH.MANAGER_PRODUCT} component={ManagerProduct} />
                            <Route path={PATH.MANAGER_USER} component={ManagerAccount} />
                            <Route exact={true} path={PATH.MANAGER} component={DashBoard} />
                        </Switch>
                    </div>
                </div>
            </div>
            <div className='border bg-white h-20 leading-20 rounded shadow-2 text-center'>Bản quyền thuộc về : <span className='font-medium'>Bùi Thế Anh</span></div>
        </div>
    );
}

export default AdminRoute;