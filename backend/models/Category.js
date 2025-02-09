const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique category name
  description: { type: String }, // Optional description of the category
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);


// Seed predefined categories
const createPredefinedCategories = async () => {
  const predefinedCategories = [
    {
      name: 'Cybercrime',
      description: 'Complaints related to online fraud, hacking, or other cyber offenses.',
    },
    {
      name: 'Fraud',
      description: 'Complaints related to financial fraud, scams, or false promises.',
    },
    {
      name: 'Corruption',
      description: 'Complaints involving bribery or misuse of public office.',
    },
    {
      name: 'Theft',
      description: 'Complaints related to stolen property or burglary.',
    },
    {
      name: 'Plumbing',
      description: 'Issues related to plumbing such as leaks, blockages, etc.',
    },
  ];

  try {
    // Use insertMany to add multiple categories at once
    const result = await Category.insertMany(predefinedCategories, { ordered: false });
    console.log('Predefined categories created:', result);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Some categories already exist in the database. Skipping duplicates.');
    } else {
      console.error('Error creating predefined categories:', error);
    }
  }
};

// Call the function
//createPredefinedCategories();


module.exports = Category;