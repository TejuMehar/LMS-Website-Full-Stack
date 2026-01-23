import Course from "../model/courseModel.js";

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "Search Query is required" });
    }

    // Split input into individual words for better matching
    const searchWords = input.toLowerCase().split(' ').filter(word => word.length > 0);
    
    // Create regex patterns for each word
    const wordRegexes = searchWords.map(word => new RegExp(word, 'i'));
    
    const courses = await Course.find({
      isPublished: true,
      $or: [
        // Match any word in title
        { title: { $in: wordRegexes } },
        // Match any word in subtitle
        { subTitle: { $in: wordRegexes } },
        // Match any word in description
        { description: { $in: wordRegexes } },
        // Match any word in category
        { category: { $in: wordRegexes } },
        // Match any word in level
        { level: { $in: wordRegexes } },
        // Also keep original full text search
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });
    return res.status(200).json({ courses });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error while searching courses ${err.message}` });
  }
};
