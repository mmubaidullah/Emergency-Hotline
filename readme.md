              সকল প্রশ্নের উত্তর 
=======================================
1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
---------------------------------------
**getElementById** একটি নির্দিষ্ট id-ওয়ালা element নির্বাচন করতে ব্যবহৃত হয় এবং সবসময় একটি element রিটার্ন করে।
---------------------------------------
**getElementsByClassName**
নির্দিষ্ট class name-ওয়ালা একাধিক element নির্বাচন করতে ব্যবহৃত হয় এবং একটি HTMLCollection (array-এর মতো) রিটার্ন করে।
---------------------------------------
**querySelector:**
CSS selector দিয়ে element সিলেক্ট করা যায়। প্রথম ম্যাচ করা element রিটার্ন করে।
---------------------------------------
**querySelectorAll**
CSS selector দিয়ে element সিলেক্ট করা যায়। এবং NodeList আকারে সবগুলো মিল থাকা element রিটার্ন করে।
=======================================
2. How do you **create and insert a new element into the DOM**?
---------------------------------------
**নিম্মোক্ত পদ্ধতিতে DOM-এ নতুন element তৈরি ও যোগ করা যায়**
* document.createElement("tagName") দিয়ে নতুন element তৈরি করা।
* element.textContent = "Text" অথবা element.innerHTML ব্যবহার করে কনটেন্ট সেট করা।
* যেখানে যোগ করার প্রয়োজন সেখানে appendChild() বা append() দিয়ে যুক্ত করা।
=======================================
3. What is **Event Bubbling** and how does it work?
**Event Bubbling** মানে হলো – যখন কোনো child element-এ event ঘটে, তখন সেটা প্রথমে ওই element-এ কাজ করে, এরপর ধাপে ধাপে তার প্যারেন্ট element-এ, এরপর প্যারেন্টের প্যারেন্টে, এভাবে পুরো document পর্যন্ত চলে যায়।
---------------------------------------
**এটি কিভাবে কাজ করে** যখন আমি একটি element-এ ক্লিক করব, ব্রাউজার প্রথমে সেই element-এর উপর click ইভেন্টটি ট্রিগার করে। এরপর এটি প্যারেন্ট element-এর উপর click ইভেন্ট ট্রিগার করে, এবং এভাবে document অবজেক্ট পর্যন্ত পৌঁছায়।
=======================================
4. What is **Event Delegation** in JavaScript? Why is it useful?
**Event Delegation** বলতে পারি এটি একটি টেকনিক যেখানে আলাদা আলাদা element-এ ইভেন্ট বসানোর বদলে তাদের parent element-এ ইভেন্ট বসানো হয়। তারপর parent এর ভেতরে কোন child-এ event হয়েছে সেটা event.target দিয়ে বের করা হয়।
---------------------------------------
**বিভিন্ন কারণে এটাকে দরকারি বলা যায় যেমন:**
* অনেক element থাকলে আলাদা আলাদা event listener বসাতে হবে না।
* নতুন element DOM-এ যোগ হলেও event parent এর মাধ্যমে কাজ করবে।
* কোড কমে যায়, সুতরাং আমার কোড কমে গেলে পারফরম্যান্সও ভালো হবে।
=======================================
5. What is the difference between **preventDefault() and stopPropagation()** methods?
**preventDefault()** এই পদ্ধতিটি কোনো element-এর ডিফল্ট অ্যাকশন বা স্বাভাবিক আচরণ বন্ধ করে দেয়। যেমনঃ ফর্ম submit না করা, একটি <a> ট্যাগে ক্লিক করলে নতুন পেজে না যাওয়া।
---------------------------------------
আর **stopPropagation()** শুধুমাত্র বর্তমান ইভেন্টটি বন্ধ করে, কিন্তু ডিফল্ট অ্যাকশন বন্ধ করে না।
=======================================

