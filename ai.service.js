// Logic for AI recommendations
const getRecommendations = async (userPreferences) => {
    const { preferredGame, maxBudget, minDpi } = userPreferences;

    return await prisma.product.findMany({
        where: {
            category: preferredGame,
            price: { lte: maxBudget },
            dpi: { gte: minDpi }
        },
        take: 4,
        orderBy: { stock: 'desc' }
    });
};

module.exports = { getRecommendations };