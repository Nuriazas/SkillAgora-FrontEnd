const getCategoriesService = async () => {
    try {
        const response = await fetch("http://localhost:3000/services/categories");
        const data = await response.json();
        
        if (data.success) {
            return {
                success: true,
                data: data.service
            };
        } else {
            return {
                success: false,
                error: data.message || "Error loading categories"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export default getCategoriesService;