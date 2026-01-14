-- This file contains seed data for blog posts and users
-- Run this after schema.sql to populate the database with sample data

USE blog_db;

-- Insert sample users (additional to admin)
INSERT INTO users (name, email, password, is_admin, bio) VALUES
('Sarah Johnson', 'sarah@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Food enthusiast and recipe creator. Sharing delicious recipes and cooking tips for home cooks.'),
('Emily Chen', 'emily@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Professional chef specializing in international cuisine and healthy eating.'),
('Michael Brown', 'michael@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Certified yoga instructor and fitness coach. Passionate about holistic health and wellness.'),
('Jessica Lee', 'jessica@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Organization expert and lifestyle blogger. Helping people create beautiful, functional living spaces.'),
('David Wilson', 'david@blog.com', '$2b$10$NyGkpaldV07ezTU6SEhNTOsamqzdHbctbsuos8GjzSiuNdOArb8lq', FALSE, 'Travel blogger exploring the world and sharing travel tips and destination guides.');

-- Update categories to English themes
TRUNCATE TABLE categories;
INSERT INTO categories (name, slug, description) VALUES
('Cooking', 'cooking', 'Delicious recipes and cooking techniques'),
('Sports', 'sports', 'Fitness, exercise, and athletic activities'),
('Lifestyle', 'lifestyle', 'Daily life tips and personal development'),
('Tips & Tricks', 'tips-tricks', 'Helpful hacks for everyday situations'),
('Travel', 'travel', 'Travel guides and adventure stories'),
('Health', 'health', 'Wellness, nutrition, and healthy living');

-- Insert blog posts with real English content
INSERT INTO posts (title, content, excerpt, category, image, author_id) VALUES
(
  '10 Easy Dinner Recipes for Busy Weeknights',
  '<p>Finding time to cook a healthy dinner can be challenging when you have a busy schedule. Here are 10 quick and delicious recipes that can be prepared in 30 minutes or less.</p>

<h2>1. One-Pan Lemon Garlic Chicken</h2>
<p>This simple dish combines juicy chicken breasts with fresh lemon and aromatic garlic. Just season the chicken, sear it in a pan, and finish with a lemon-garlic butter sauce. Serve with steamed vegetables or rice.</p>

<h2>2. Quick Vegetable Stir-Fry</h2>
<p>A colorful mix of fresh vegetables tossed in a savory sauce. Use whatever vegetables you have on hand - bell peppers, broccoli, carrots, and snap peas work great. Add tofu or chicken for protein.</p>

<h2>3. Easy Pasta Primavera</h2>
<p>This Italian classic features al dente pasta tossed with seasonal vegetables and a light cream sauce. It is versatile, nutritious, and can be customized with your favorite veggies.</p>

<h2>4. Sheet Pan Salmon and Vegetables</h2>
<p>Place salmon fillets and your choice of vegetables on a baking sheet, drizzle with olive oil, season, and roast. Everything cooks together for easy cleanup.</p>

<h2>5. Beef Tacos</h2>
<p>Brown ground beef with taco seasoning, then serve in warm tortillas with your favorite toppings like lettuce, tomatoes, cheese, and sour cream.</p>',
  'Discover quick and delicious dinner recipes perfect for busy weeknights. All meals can be prepared in 30 minutes or less with simple ingredients.',
  'Cooking',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop',
  2
),
(
  'The Complete Guide to Baking Homemade Bread',
  '<p>There is nothing quite like the aroma and taste of freshly baked bread. This comprehensive guide will teach you everything you need to know to bake perfect bread at home.</p>

<h2>Essential Ingredients</h2>
<ul>
<li>500g bread flour</li>
<li>10g instant yeast</li>
<li>10g sugar</li>
<li>8g salt</li>
<li>300ml warm water</li>
<li>30ml olive oil</li>
</ul>

<h2>Basic Bread-Making Process</h2>

<h3>Step 1: Activate the Yeast</h3>
<p>Combine warm water (not hot!), sugar, and yeast in a bowl. Let it sit for 5-10 minutes until foamy.</p>

<h3>Step 2: Mix the Dough</h3>
<p>In a large bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix until a shaggy dough forms.</p>

<h3>Step 3: Knead</h3>
<p>Turn the dough onto a floured surface and knead for 10-15 minutes until smooth and elastic. The dough should spring back when poked.</p>

<h3>Step 4: First Rise</h3>
<p>Place the dough in a greased bowl, cover with a damp cloth, and let it rise in a warm place for 1-2 hours until doubled in size.</p>

<h2>Tips for Perfect Bread</h2>
<ul>
<li>Use fresh yeast for best results</li>
<li>Do not rush the rising process</li>
<li>Knead thoroughly to develop gluten</li>
<li>Create steam in the oven for a crispy crust</li>
<li>Let bread cool completely before slicing</li>
</ul>',
  'Learn to bake perfect homemade bread with this step-by-step guide. Includes tips, techniques, and variations for delicious results every time.',
  'Cooking',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  3
),
(
  'Morning Yoga Routine for Flexibility and Energy',
  '<p>Starting your day with yoga can transform your mornings and boost your energy for the day ahead. This 15-minute routine is perfect for all levels.</p>

<h2>1. Child Pose (Balasana)</h2>
<p>Begin in a kneeling position, sit back on your heels, and stretch your arms forward. This gentle pose helps you center yourself and wake up your body gradually.</p>
<p><strong>Duration:</strong> Hold for 1-2 minutes</p>
<p><strong>Benefits:</strong> Relaxes the spine, shoulders, and mind</p>

<h2>2. Cat-Cow Stretch</h2>
<p>Move between arching and rounding your spine to warm up the back.</p>
<p><strong>How to do it:</strong> Start on hands and knees, inhale to arch (Cow), exhale to round (Cat). Repeat 10-15 times.</p>

<h2>3. Downward Facing Dog</h2>
<p>From hands and knees, lift hips up and back, forming an inverted V-shape.</p>
<p><strong>Duration:</strong> Hold for 30 seconds to 1 minute</p>
<p><strong>Benefits:</strong> Stretches hamstrings, calves, and shoulders; energizes the body</p>

<h2>4. Warrior I</h2>
<p>A powerful standing pose that builds strength and stamina. Step one foot forward, bend front knee to 90 degrees, raise arms overhead.</p>

<h2>5. Tree Pose</h2>
<p>A balancing pose that improves focus and stability. Stand on one leg, place opposite foot on inner thigh, hands in prayer position.</p>',
  'Wake up and energize your body with this 15-minute morning yoga routine. Perfect for beginners and experienced practitioners alike.',
  'Sports',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  4
),
(
  'The Ultimate Guide to Organizing Your Closet',
  '<p>A well-organized closet can save you time, reduce stress, and help you make better use of your wardrobe. Learn the KonMari method and other expert tips.</p>

<h2>The KonMari Method</h2>
<p>Marie Kondo famous method focuses on keeping only items that spark joy.</p>

<h3>Steps:</h3>
<ol>
<li>Remove everything from your closet</li>
<li>Hold each item and ask: Does this spark joy?</li>
<li>Keep only what you love and use</li>
<li>Fold clothes vertically so they stand upright</li>
<li>Organize by category and color</li>
</ol>

<h2>Vertical Folding Technique</h2>
<p>Instead of stacking, fold clothes so they stand on their own:</p>
<ul>
<li><strong>T-shirts:</strong> Fold in thirds lengthwise, then fold into a rectangle</li>
<li><strong>Jeans:</strong> Fold in half lengthwise, then fold into thirds</li>
<li><strong>Dresses:</strong> Fold lengthwise, then fold based on length</li>
</ul>

<h2>Categorization Strategies</h2>
<h3>1. By Season</h3>
<p>Keep current season clothes accessible, store off-season items in bins or on high shelves.</p>

<h3>2. By Type</h3>
<p>Separate tops, bottoms, dresses, outerwear, and undergarments.</p>

<h3>3. By Color</h3>
<p>Arrange from light to dark or group by color families for visual appeal.</p>

<h2>Benefits of an Organized Closet</h2>
<ul>
<li>Save up to 50% more space</li>
<li>Find outfits faster in the morning</li>
<li>Reduce clothing wrinkles</li>
<li>Feel more relaxed and in control</li>
</ul>',
  'Master the art of closet organization with these expert tips and the KonMari method. Create a functional, beautiful space that saves time and reduces stress.',
  'Lifestyle',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  5
),
(
  'Top 5 Must-Visit Destinations in Southeast Asia',
  '<p>Southeast Asia offers incredible diversity, from pristine beaches to ancient temples. Here are five destinations that should be on every traveler bucket list.</p>

<h2>1. Bali, Indonesia - Island Paradise</h2>
<p>Bali combines stunning beaches, lush rice terraces, and rich culture.</p>

<h3>Must-See Attractions:</h3>
<ul>
<li>Uluwatu Temple perched on dramatic cliffs</li>
<li>Tegalalang Rice Terraces</li>
<li>Sacred Monkey Forest Sanctuary</li>
<li>Beach clubs in Seminyak</li>
<li>Sunrise hike up Mount Batur</li>
</ul>

<p><strong>Best Time to Visit:</strong> April-October (dry season)</p>
<p><strong>Budget:</strong> $30-50 per day for mid-range travelers</p>

<h2>2. Siem Reap, Cambodia - Ancient Wonders</h2>
<p>Home to the magnificent Angkor Wat temple complex.</p>

<h3>Highlights:</h3>
<ul>
<li>Angkor Wat at sunrise</li>
<li>Bayon Temple with smiling faces</li>
<li>Ta Prohm (the jungle temple)</li>
<li>Floating villages on Tonle Sap Lake</li>
</ul>

<h2>3. Halong Bay, Vietnam - Natural Marvel</h2>
<p>A UNESCO World Heritage site featuring thousands of limestone islands.</p>

<h3>Activities:</h3>
<ul>
<li>Overnight cruise through the bay</li>
<li>Kayaking in hidden lagoons</li>
<li>Exploring caves and grottoes</li>
<li>Swimming and beach time</li>
</ul>

<h2>Travel Tips for Southeast Asia</h2>
<ul>
<li>Check visa requirements</li>
<li>Get travel insurance</li>
<li>Dress modestly when visiting temples</li>
<li>Try street food but choose busy vendors</li>
<li>Learn basic local phrases</li>
</ul>',
  'Explore the best of Southeast Asia with this guide to five incredible destinations. From ancient temples to tropical beaches, discover the magic of this diverse region.',
  'Travel',
  'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
  6
),
(
  '10 Simple Ways to Save Energy at Home',
  '<p>Reduce your electricity bills and environmental impact with these practical energy-saving tips that anyone can implement.</p>

<h2>1. Switch to LED Bulbs</h2>
<p>Replace incandescent and CFL bulbs with LED alternatives.</p>
<h3>Benefits:</h3>
<ul>
<li>Use 75% less energy</li>
<li>Last 10-15 times longer</li>
<li>Produce less heat</li>
<li>Available in various color temperatures</li>
</ul>

<h2>2. Unplug Devices When Not in Use</h2>
<p>Many electronics consume power even when turned off (phantom load).</p>
<h3>Biggest culprits:</h3>
<ul>
<li>TVs and cable boxes</li>
<li>Computer equipment</li>
<li>Phone chargers</li>
<li>Microwave ovens</li>
</ul>

<h2>3. Optimize Air Conditioning Usage</h2>
<p>AC units are the largest energy consumers in most homes.</p>
<h3>Energy-saving strategies:</h3>
<ul>
<li>Set temperature to 78°F (25°C) or higher</li>
<li>Clean or replace filters every 1-3 months</li>
<li>Close doors and curtains to keep cool air in</li>
<li>Use ceiling fans to circulate air</li>
</ul>

<h2>4. Improve Refrigerator Efficiency</h2>
<p>Refrigerators run 24/7, making efficiency crucial.</p>
<h3>Tips:</h3>
<ul>
<li>Keep temperature at 37-40°F (3-4°C)</li>
<li>Check door seals regularly</li>
<li>Clean condenser coils every 6 months</li>
<li>Keep it at least 4 inches from walls</li>
</ul>

<h2>Expected Savings</h2>
<p>By implementing these tips, you can reduce energy bills by 20-30%, extend appliance lifespan, and decrease your carbon footprint.</p>',
  'Discover practical tips to reduce your energy consumption and lower electricity bills. Simple changes that make a big difference for your wallet and the environment.',
  'Tips & Tricks',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
  2
),
(
  'Running for Beginners: A Complete Guide',
  '<p>Running is one of the most accessible forms of exercise. This guide will help you start safely and build a lasting running habit.</p>

<h2>Benefits of Running</h2>
<h3>Physical Health</h3>
<ul>
<li>Strengthens cardiovascular system</li>
<li>Burns 300-600 calories per hour</li>
<li>Builds leg and core strength</li>
<li>Increases bone density</li>
<li>Improves lung capacity</li>
</ul>

<h3>Mental Health</h3>
<ul>
<li>Releases endorphins (runner high)</li>
<li>Reduces stress and anxiety</li>
<li>Improves sleep quality</li>
<li>Boosts self-confidence</li>
</ul>

<h2>Proper Running Form</h2>
<h3>Body Position</h3>
<ul>
<li><strong>Head:</strong> Look forward, not down</li>
<li><strong>Shoulders:</strong> Relaxed and low, not hunched</li>
<li><strong>Back:</strong> Straight with slight forward lean</li>
<li><strong>Arms:</strong> Bent at 90 degrees, swing naturally</li>
<li><strong>Feet:</strong> Land mid-foot, not heel first</li>
</ul>

<h2>Training Plan for Beginners</h2>
<h3>Week 1-2: Foundation</h3>
<ul>
<li>Run 10-15 minutes, 3 times per week</li>
<li>Alternate running and walking</li>
<li>Focus on consistency, not speed</li>
</ul>

<h3>Week 3-4: Building</h3>
<ul>
<li>Increase to 20-25 minutes</li>
<li>Run 3-4 times per week</li>
<li>Reduce walking intervals</li>
</ul>

<h2>Essential Tips</h2>
<ul>
<li>Get proper running shoes</li>
<li>Stay hydrated</li>
<li>Warm up and cool down</li>
<li>Listen to your body</li>
<li>Rest when needed</li>
</ul>',
  'Everything you need to know to start running safely and build a lasting habit. Includes training plans, form tips, and injury prevention strategies.',
  'Sports',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
  4
),
(
  'Meal Prep 101: Save Time and Eat Healthy',
  '<p>Meal prepping is a game-changer for busy people who want to eat well without spending hours in the kitchen every day.</p>

<h2>Benefits of Meal Prepping</h2>
<ul>
<li>Save 4-6 hours per week on cooking</li>
<li>Reduce food waste by 30-50%</li>
<li>Save money on takeout and groceries</li>
<li>Better portion control</li>
<li>Healthier eating choices</li>
</ul>

<h2>Getting Started</h2>
<h3>Essential Equipment</h3>
<ul>
<li>Glass or BPA-free plastic containers</li>
<li>Multiple sizes: 1-cup, 2-cup, and 4-cup containers</li>
<li>Sheet pans for batch cooking</li>
<li>Sharp knives and cutting boards</li>
</ul>

<h2>Weekly Meal Prep Plan</h2>
<h3>Step 1: Plan Your Menu (30 minutes)</h3>
<ul>
<li>Choose 3-4 protein sources</li>
<li>Select 4-5 vegetables</li>
<li>Pick 2-3 carb options</li>
<li>List healthy snacks</li>
</ul>

<h3>Step 2: Shop Smart (1 hour)</h3>
<ul>
<li>Shop once per week</li>
<li>Stick to your list</li>
<li>Buy in bulk when possible</li>
</ul>

<h3>Step 3: Prep Day (2-3 hours)</h3>
<ul>
<li>Hour 1: Wash and chop vegetables</li>
<li>Hour 2: Cook proteins</li>
<li>Hour 3: Prepare grains and assemble meals</li>
</ul>

<h2>Easy Meal Prep Recipes</h2>
<h3>1. Chicken Burrito Bowls</h3>
<p>Seasoned grilled chicken, rice, black beans, vegetables, and toppings. Cook all components, store separately.</p>

<h3>2. Mason Jar Salads</h3>
<p>Layer dressing, hard vegetables, proteins, grains, and greens. Keeps 4-5 days.</p>

<h3>3. Sheet Pan Dinners</h3>
<p>Protein plus 2-3 vegetables roasted together. Quick and easy cleanup.</p>',
  'Master the art of meal prepping to save time, money, and eat healthier throughout the week. Includes recipes, tips, and a complete beginner guide.',
  'Cooking',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  2
),
(
  '15-Minute Home Workouts: No Equipment Needed',
  '<p>Get fit at home with these effective bodyweight exercises. No gym membership or equipment required!</p>

<h2>Benefits of Home Workouts</h2>
<ul>
<li>Save time and money</li>
<li>No commute to gym</li>
<li>Work out anytime</li>
<li>Privacy and comfort</li>
<li>Perfect for beginners</li>
</ul>

<h2>The Perfect 15-Minute Routine</h2>
<h3>Warm-Up (3 minutes)</h3>
<ul>
<li>30 seconds jumping jacks</li>
<li>30 seconds high knees</li>
<li>30 seconds arm circles</li>
<li>30 seconds leg swings</li>
<li>30 seconds torso twists</li>
<li>30 seconds light jogging in place</li>
</ul>

<h3>Main Workout (10 minutes)</h3>
<p>Do each exercise for 45 seconds, rest 15 seconds. Complete 2 rounds.</p>

<h4>1. Push-Ups</h4>
<p><strong>Target:</strong> Chest, shoulders, triceps, core</p>
<p>Hands shoulder-width apart, body in straight line, lower chest to floor.</p>

<h4>2. Squats</h4>
<p><strong>Target:</strong> Quads, glutes, hamstrings</p>
<p>Feet shoulder-width apart, lower hips back and down, keep chest up.</p>

<h4>3. Plank</h4>
<p><strong>Target:</strong> Core, shoulders</p>
<p>Forearms on ground, body in straight line, hold position.</p>

<h4>4. Lunges</h4>
<p><strong>Target:</strong> Legs, glutes, balance</p>
<p>Step forward, lower back knee, alternate legs.</p>

<h4>5. Mountain Climbers</h4>
<p><strong>Target:</strong> Full body, cardio</p>
<p>Push-up position, bring knees to chest alternately.</p>

<h3>Cool-Down (2 minutes)</h3>
<ul>
<li>Quad stretch</li>
<li>Hamstring stretch</li>
<li>Shoulder stretch</li>
<li>Chest stretch</li>
</ul>',
  'Effective bodyweight exercises you can do anywhere in just 15 minutes. Perfect for busy schedules, no equipment required.',
  'Sports',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  4
),
(
  'Creating a Minimalist Home: Room by Room Guide',
  '<p>Minimalism is not about having nothing - it is about making room for what matters. Transform your home into a peaceful, functional space.</p>

<h2>The Minimalist Philosophy</h2>
<ul>
<li>Keep only what adds value to your life</li>
<li>Quality over quantity</li>
<li>Everything has a place</li>
<li>Clear surfaces equals clear mind</li>
<li>Intentional purchasing</li>
</ul>

<h2>Living Room</h2>
<h3>Essential Furniture:</h3>
<ul>
<li>Comfortable sofa or sectional</li>
<li>Coffee table with storage</li>
<li>TV stand or wall mount</li>
<li>One accent chair</li>
<li>Minimal decor pieces</li>
</ul>

<h3>Declutter:</h3>
<ul>
<li>Remove excess throw pillows (keep 2-4)</li>
<li>Limit books on display</li>
<li>One piece of wall art per wall</li>
<li>Clear all surfaces daily</li>
</ul>

<h2>Bedroom</h2>
<h3>Minimalist Sleep Sanctuary:</h3>
<ul>
<li>Quality mattress and pillows</li>
<li>Simple bedding in neutral colors</li>
<li>Two nightstands with lamps</li>
<li>Dresser or closet for clothes</li>
</ul>

<h3>Closet Minimalism:</h3>
<ul>
<li>Capsule wardrobe: 30-40 versatile pieces</li>
<li>Neutral color palette</li>
<li>Match hangers for cohesive look</li>
<li>One in, one out rule</li>
</ul>

<h2>Kitchen</h2>
<h3>Keep:</h3>
<ul>
<li>One set of dishes (8 of each)</li>
<li>Basic cookware (2 pans, 2 pots)</li>
<li>Essential utensils only</li>
<li>Necessary small appliances only</li>
</ul>

<h2>Benefits of Minimalism</h2>
<ul>
<li>Less time cleaning</li>
<li>Reduced stress and anxiety</li>
<li>More money saved</li>
<li>Easier to find things</li>
<li>Better focus</li>
</ul>',
  'Transform your home with minimalist principles. A room-by-room guide to creating a peaceful, organized, and intentional living space.',
  'Lifestyle',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  5
),
(
  'Healthy Smoothie Recipes for Every Day',
  '<p>Start your day right with these nutritious and delicious smoothie recipes. Each one is packed with vitamins, minerals, and energy to fuel your morning.</p>

<h2>Basic Smoothie Formula</h2>
<ul>
<li>1 cup liquid (milk, water, juice)</li>
<li>1-2 cups fruit (fresh or frozen)</li>
<li>1 cup greens (optional)</li>
<li>1 tablespoon healthy fat (nut butter, seeds)</li>
<li>Protein powder or yogurt (optional)</li>
</ul>

<h2>1. Green Energy Smoothie</h2>
<h3>Ingredients:</h3>
<ul>
<li>1 cup spinach</li>
<li>1 banana</li>
<li>1/2 cup pineapple</li>
<li>1 cup coconut water</li>
<li>1 tablespoon chia seeds</li>
</ul>
<p><strong>Benefits:</strong> High in iron, vitamin C, and antioxidants. Perfect energy boost for morning workouts.</p>

<h2>2. Berry Blast Smoothie</h2>
<h3>Ingredients:</h3>
<ul>
<li>1 cup mixed berries (strawberries, blueberries, raspberries)</li>
<li>1/2 cup Greek yogurt</li>
<li>1 cup almond milk</li>
<li>1 tablespoon honey</li>
<li>Handful of ice</li>
</ul>
<p><strong>Benefits:</strong> Rich in antioxidants, protein, and probiotics. Great for skin health.</p>

<h2>3. Tropical Paradise Smoothie</h2>
<h3>Ingredients:</h3>
<ul>
<li>1 cup mango chunks</li>
<li>1/2 cup pineapple</li>
<li>1/2 banana</li>
<li>1 cup coconut milk</li>
<li>1 teaspoon coconut flakes</li>
</ul>
<p><strong>Benefits:</strong> High in vitamin C and healthy fats. Supports immune system.</p>

<h2>Smoothie Tips</h2>
<ul>
<li>Use frozen fruit for thicker texture</li>
<li>Add ice for colder smoothie</li>
<li>Blend greens first for smoother consistency</li>
<li>Adjust sweetness to taste</li>
<li>Drink immediately for best nutrition</li>
</ul>',
  'Delicious and nutritious smoothie recipes to kickstart your day. Easy to make with simple ingredients and packed with vitamins and energy.',
  'Health',
  'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
  3
),
(
  'Digital Detox: How to Unplug and Recharge',
  '<p>In our hyper-connected world, taking a break from technology is essential for mental health and well-being. Here is how to successfully implement a digital detox.</p>

<h2>Why Digital Detox Matters</h2>
<ul>
<li>Reduce stress and anxiety</li>
<li>Improve sleep quality</li>
<li>Better focus and productivity</li>
<li>Enhanced real-world relationships</li>
<li>More time for hobbies and self-care</li>
<li>Reduced eye strain and headaches</li>
</ul>

<h2>Signs You Need a Digital Detox</h2>
<ul>
<li>Checking phone first thing in the morning</li>
<li>Feeling anxious without your device</li>
<li>Difficulty concentrating on tasks</li>
<li>Comparing yourself to others on social media</li>
<li>Trouble falling asleep</li>
<li>Missing out on in-person interactions</li>
</ul>

<h2>How to Start Your Digital Detox</h2>
<h3>1. Set Clear Goals</h3>
<p>Decide what you want to achieve - better sleep, more family time, reduced stress, or improved focus.</p>

<h3>2. Choose Your Duration</h3>
<ul>
<li><strong>Mini detox:</strong> 24 hours</li>
<li><strong>Weekend detox:</strong> 2-3 days</li>
<li><strong>Week-long detox:</strong> 7 days</li>
<li><strong>Ongoing changes:</strong> Permanent habit adjustments</li>
</ul>

<h3>3. Prepare in Advance</h3>
<ul>
<li>Notify friends and family</li>
<li>Set up auto-replies for email</li>
<li>Plan offline activities</li>
<li>Remove tempting apps</li>
</ul>

<h2>Practical Digital Detox Strategies</h2>
<h3>Daily Boundaries</h3>
<ul>
<li>No phones during meals</li>
<li>No screens 1 hour before bed</li>
<li>Designated phone-free zones at home</li>
<li>Turn off non-essential notifications</li>
</ul>

<h3>Technology-Free Activities</h3>
<ul>
<li>Reading physical books</li>
<li>Outdoor walks or hiking</li>
<li>Face-to-face conversations</li>
<li>Cooking new recipes</li>
<li>Journaling or creative writing</li>
<li>Meditation or yoga</li>
<li>Board games with family</li>
</ul>

<h2>Maintaining Balance After Detox</h2>
<ul>
<li>Set daily screen time limits</li>
<li>Use grayscale mode to reduce appeal</li>
<li>Unfollow accounts that cause stress</li>
<li>Schedule specific times for social media</li>
<li>Keep phone out of bedroom</li>
<li>Practice mindful scrolling</li>
</ul>',
  'Learn how to disconnect from technology and reconnect with yourself. A comprehensive guide to digital detoxing for better mental health and well-being.',
  'Lifestyle',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  5
),
(
  'Budget-Friendly Travel Tips for Adventure Seekers',
  '<p>Traveling does not have to break the bank. With smart planning and these money-saving strategies, you can explore the world on a budget.</p>

<h2>Planning and Booking</h2>
<h3>1. Travel During Off-Peak Season</h3>
<p>Save 30-50% by avoiding peak tourist seasons. Research shoulder seasons for the best balance of good weather and lower prices.</p>

<h3>2. Use Flight Comparison Tools</h3>
<ul>
<li>Compare prices across multiple platforms</li>
<li>Set price alerts for your destination</li>
<li>Be flexible with dates</li>
<li>Consider nearby airports</li>
<li>Book on Tuesdays and Wednesdays for best deals</li>
</ul>

<h3>3. Alternative Accommodation</h3>
<ul>
<li>Hostels - social and affordable</li>
<li>Airbnb - often cheaper than hotels</li>
<li>House-sitting - free accommodation</li>
<li>Couchsurfing - meet locals</li>
<li>Camping - budget-friendly outdoor option</li>
</ul>

<h2>Saving Money While Traveling</h2>
<h3>Food and Dining</h3>
<ul>
<li>Eat where locals eat</li>
<li>Shop at local markets</li>
<li>Cook your own meals when possible</li>
<li>Take advantage of free hotel breakfast</li>
<li>Carry refillable water bottle</li>
</ul>

<h3>Transportation</h3>
<ul>
<li>Use public transportation</li>
<li>Walk or rent bicycles</li>
<li>Book rideshares instead of taxis</li>
<li>Consider bus or train over flying for short distances</li>
</ul>

<h3>Activities and Entertainment</h3>
<ul>
<li>Take free walking tours</li>
<li>Visit museums on free admission days</li>
<li>Enjoy nature - beaches, parks, hiking trails</li>
<li>Attend free local festivals and events</li>
<li>Book activities through local operators</li>
</ul>

<h2>Budget Travel Destinations</h2>
<h3>Southeast Asia</h3>
<p>Countries like Thailand, Vietnam, and Cambodia offer incredible experiences for $20-30 per day.</p>

<h3>Eastern Europe</h3>
<p>Poland, Hungary, and Romania provide rich culture and history at fraction of Western Europe costs.</p>

<h3>Central America</h3>
<p>Guatemala, Nicaragua, and Honduras offer adventure and natural beauty on a budget.</p>

<h2>Packing Smart</h2>
<ul>
<li>Pack light to avoid baggage fees</li>
<li>Bring reusable items</li>
<li>Download offline maps</li>
<li>Pack snacks for long journeys</li>
<li>Bring travel-size toiletries</li>
</ul>',
  'Discover how to travel the world without emptying your wallet. Practical tips for budget-conscious adventurers who want to see more while spending less.',
  'Travel',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
  6
),
(
  'Stress Management Techniques for a Calmer Life',
  '<p>Chronic stress can take a toll on your physical and mental health. Learn effective techniques to manage stress and cultivate inner peace.</p>

<h2>Understanding Stress</h2>
<h3>Common Stress Triggers</h3>
<ul>
<li>Work pressure and deadlines</li>
<li>Financial concerns</li>
<li>Relationship challenges</li>
<li>Health issues</li>
<li>Major life changes</li>
</ul>

<h3>Signs of Chronic Stress</h3>
<ul>
<li>Persistent fatigue</li>
<li>Difficulty sleeping</li>
<li>Irritability and mood swings</li>
<li>Headaches or muscle tension</li>
<li>Difficulty concentrating</li>
<li>Changes in appetite</li>
</ul>

<h2>Proven Stress Management Techniques</h2>
<h3>1. Deep Breathing Exercises</h3>
<p><strong>4-7-8 Technique:</strong></p>
<ul>
<li>Inhale through nose for 4 counts</li>
<li>Hold breath for 7 counts</li>
<li>Exhale through mouth for 8 counts</li>
<li>Repeat 4 times</li>
</ul>

<h3>2. Progressive Muscle Relaxation</h3>
<p>Tense and release each muscle group from toes to head. Helps identify and release physical tension.</p>

<h3>3. Mindfulness Meditation</h3>
<ul>
<li>Start with 5 minutes daily</li>
<li>Focus on your breath</li>
<li>Observe thoughts without judgment</li>
<li>Gradually increase duration</li>
</ul>

<h3>4. Regular Exercise</h3>
<ul>
<li>30 minutes of moderate activity daily</li>
<li>Walking, swimming, cycling, or yoga</li>
<li>Releases endorphins</li>
<li>Improves sleep and mood</li>
</ul>

<h3>5. Time Management</h3>
<ul>
<li>Prioritize tasks</li>
<li>Break large projects into smaller steps</li>
<li>Set realistic deadlines</li>
<li>Learn to say no</li>
<li>Delegate when possible</li>
</ul>

<h2>Lifestyle Changes for Stress Reduction</h2>
<h3>Sleep Hygiene</h3>
<ul>
<li>Maintain consistent sleep schedule</li>
<li>Create relaxing bedtime routine</li>
<li>Keep bedroom cool and dark</li>
<li>Limit screen time before bed</li>
<li>Aim for 7-9 hours nightly</li>
</ul>

<h3>Nutrition</h3>
<ul>
<li>Eat balanced, regular meals</li>
<li>Limit caffeine and sugar</li>
<li>Stay hydrated</li>
<li>Include omega-3 rich foods</li>
<li>Reduce alcohol consumption</li>
</ul>

<h2>When to Seek Professional Help</h2>
<p>Consider therapy or counseling if stress interferes with daily functioning, causes persistent physical symptoms, or leads to unhealthy coping mechanisms.</p>',
  'Master effective stress management techniques to improve your mental and physical well-being. Practical strategies for finding calm in a chaotic world.',
  'Health',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
  4
),
(
  'Urban Gardening: Growing Food in Small Spaces',
  '<p>You do not need a large backyard to grow your own food. Discover how to create a thriving garden in apartments, balconies, and small urban spaces.</p>

<h2>Benefits of Urban Gardening</h2>
<ul>
<li>Fresh, organic produce at home</li>
<li>Reduce grocery costs</li>
<li>Improve air quality</li>
<li>Stress relief and mental health benefits</li>
<li>Connect with nature</li>
<li>Sustainable living practice</li>
</ul>

<h2>Getting Started</h2>
<h3>Assess Your Space</h3>
<ul>
<li><strong>Sunlight:</strong> Most vegetables need 6-8 hours</li>
<li><strong>Water access:</strong> Ensure easy watering</li>
<li><strong>Weight capacity:</strong> Check balcony limits</li>
<li><strong>Wind exposure:</strong> Protect delicate plants</li>
</ul>

<h3>Essential Supplies</h3>
<ul>
<li>Containers with drainage holes</li>
<li>Quality potting soil</li>
<li>Seeds or seedlings</li>
<li>Watering can or hose</li>
<li>Organic fertilizer</li>
<li>Small hand tools</li>
</ul>

<h2>Best Plants for Small Spaces</h2>
<h3>Easy Vegetables</h3>
<ul>
<li><strong>Tomatoes:</strong> Cherry varieties in pots</li>
<li><strong>Lettuce:</strong> Grows quickly, continuous harvest</li>
<li><strong>Peppers:</strong> Compact and productive</li>
<li><strong>Radishes:</strong> Fast-growing, small space needed</li>
<li><strong>Green beans:</strong> Vertical growth saves space</li>
</ul>

<h3>Herbs</h3>
<ul>
<li>Basil - warm, sunny spots</li>
<li>Parsley - tolerates partial shade</li>
<li>Mint - grows aggressively (contain it!)</li>
<li>Cilantro - cool weather lover</li>
<li>Thyme - drought-tolerant</li>
</ul>

<h2>Space-Saving Techniques</h2>
<h3>1. Vertical Gardening</h3>
<ul>
<li>Wall-mounted planters</li>
<li>Trellises for climbing plants</li>
<li>Stacked containers</li>
<li>Hanging baskets</li>
</ul>

<h3>2. Container Selection</h3>
<ul>
<li>Use window boxes</li>
<li>Repurpose old containers</li>
<li>Try fabric grow bags</li>
<li>Stack strawberry planters</li>
</ul>

<h3>3. Succession Planting</h3>
<p>Plant new seeds every 2 weeks for continuous harvest rather than all at once.</p>

<h2>Care and Maintenance</h2>
<h3>Watering</h3>
<ul>
<li>Check soil moisture daily</li>
<li>Water deeply but less frequently</li>
<li>Morning watering is best</li>
<li>Use self-watering containers for convenience</li>
</ul>

<h3>Fertilizing</h3>
<ul>
<li>Container plants need regular feeding</li>
<li>Use organic compost or fertilizer</li>
<li>Feed every 2-4 weeks during growing season</li>
</ul>

<h2>Common Challenges</h2>
<h3>Limited Sunlight</h3>
<p>Choose shade-tolerant plants like lettuce, spinach, or herbs.</p>

<h3>Pests</h3>
<p>Use natural solutions like neem oil, companion planting, or hand-picking.</p>

<h3>Space Constraints</h3>
<p>Focus on high-yield, compact varieties. Grow vertically whenever possible.</p>

<h2>Year-Round Growing</h2>
<ul>
<li>Use cold frames for winter growing</li>
<li>Bring containers indoors</li>
<li>Grow microgreens on windowsills</li>
<li>Plan seasonal rotations</li>
</ul>',
  'Transform your balcony or small space into a productive urban garden. Learn practical techniques for growing fresh vegetables and herbs at home.',
  'Lifestyle',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
  5
),
(
  'Photography Basics: Capturing Better Photos',
  '<p>Great photography is about more than having an expensive camera. Learn fundamental techniques to dramatically improve your photos with any device.</p>

<h2>Understanding the Basics</h2>
<h3>The Exposure Triangle</h3>
<ul>
<li><strong>Aperture:</strong> Controls depth of field and light</li>
<li><strong>Shutter Speed:</strong> Controls motion blur and light</li>
<li><strong>ISO:</strong> Controls sensitivity to light</li>
</ul>

<h2>Composition Techniques</h2>
<h3>1. Rule of Thirds</h3>
<p>Imagine dividing your frame into a 3x3 grid. Place important elements along the lines or at intersection points for more dynamic compositions.</p>

<h3>2. Leading Lines</h3>
<p>Use natural lines (roads, fences, rivers) to draw the viewer eye into the photo and toward your subject.</p>

<h3>3. Framing</h3>
<p>Use natural frames like doorways, windows, or tree branches to add depth and focus attention on your subject.</p>

<h3>4. Symmetry and Patterns</h3>
<p>Look for repeating elements or symmetrical compositions. Breaking the pattern can add interest.</p>

<h3>5. Negative Space</h3>
<p>Leave empty space around your subject to create a minimalist, impactful image.</p>

<h2>Lighting Tips</h2>
<h3>Golden Hour</h3>
<p>Shoot during the hour after sunrise or before sunset for warm, soft, flattering light.</p>

<h3>Avoid Harsh Midday Sun</h3>
<p>Direct overhead sun creates unflattering shadows. Use shade or wait for better light.</p>

<h3>Use Natural Light</h3>
<p>Position subjects near windows for beautiful, soft indoor lighting.</p>

<h2>Smartphone Photography Tips</h2>
<ul>
<li>Clean your lens regularly</li>
<li>Use gridlines to apply rule of thirds</li>
<li>Tap to focus before shooting</li>
<li>Avoid digital zoom - move closer instead</li>
<li>Hold steady or use burst mode</li>
<li>Edit photos for better results</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>Not getting close enough to subject</li>
<li>Cluttered backgrounds</li>
<li>Camera shake from slow shutter</li>
<li>Over-editing photos</li>
<li>Ignoring the background</li>
<li>Shooting everything at eye level</li>
</ul>

<h2>Practice Exercises</h2>
<h3>Daily Photo Challenge</h3>
<p>Take one photo every day focusing on a specific technique or subject.</p>

<h3>One Location, Multiple Perspectives</h3>
<p>Photograph the same subject from different angles, distances, and heights.</p>

<h3>Genre Focus</h3>
<p>Spend a week on one genre - portraits, landscapes, street photography, etc.</p>',
  'Master essential photography techniques to take stunning photos. From composition rules to lighting tips, elevate your photography skills.',
  'Tips & Tricks',
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
  6
);
