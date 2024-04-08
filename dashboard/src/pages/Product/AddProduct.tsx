

const AddProduct = () => {
    return (
        <div>
            <div className="bg-secondary p-6 rounded-lg">
                <h2 className="text-center font-semibold text-primary text-2xl">
                    Add New Product
                </h2>
                <CreateProductForm
                    handleAddProduct={handleAddProduct}
                    handleChangeCategory={handleChangeCategory}
                    subCategories={subCategories}
                    values={values}
                    setValues={setValues}
                    isShow={isShow}
                    loading={loading}
                    setLoading={setLoading}
                    setSubCategoryRef={setSubCategoryRef}
                    setColorRef={setColorRef}
                    setSizeRef={setSizeRef}
                />
            </div>
        </div>
    );
};

export default AddProduct;
