
fetch('otkan-kunlar.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('JSON fayl yuklanmadi');
    }
    return response.json();
  })
  .then(data => {
    const book = document.getElementById('book');

    // Eski tarkibni tozalash
    book.innerHTML = '';

    // Kitob nomi
    const title = document.createElement('h1');
    title.textContent = data.title_latin || data.title;
    book.appendChild(title);

    // Muallif
    const author = document.createElement('p');
    author.textContent = data.author_latin || data.author;
    book.appendChild(author);

    // So‘zboshi
    if (data.preface && data.preface.length) {
      const preface = document.createElement('section');
      preface.className = 'book-preface container';

      const heading = document.createElement('h2');
      heading.textContent = 'So‘zboshi';
      preface.appendChild(heading);

      data.preface.forEach(text => {
        const paragraphContainer = document.createElement('div');
        paragraphContainer.className = 'book-paragraph';

        const p = document.createElement('p');
        p.textContent = text;

        paragraphContainer.appendChild(p);
        preface.appendChild(paragraphContainer);
      });

      book.appendChild(preface);
    }

    // Kitob bo‘limlari
    data.parts.forEach((part, index) => {
      const section = document.createElement('section');
      section.className = 'book-part container';
      section.id = `part-${index + 1}`;

      // Bo‘lim nomi
      const partTitle = document.createElement('h2');
      partTitle.textContent = part.title;
      section.appendChild(partTitle);

      // Boblar
      part.chapters.forEach(chapter => {
        const article = document.createElement('article');
        article.className = 'book-chapter';

        // Bob sarlavhasi
        const chapterTitle = document.createElement('h3');
        chapterTitle.textContent =
          chapter.number + '. ' + chapter.title;

        article.appendChild(chapterTitle);

        // Har bir xatboshi alohida container
        chapter.paragraphs.forEach(text => {
          const paragraphContainer =
            document.createElement('div');

          paragraphContainer.className = 'book-paragraph';

          const p = document.createElement('p');
          p.textContent = text;

          paragraphContainer.appendChild(p);
          article.appendChild(paragraphContainer);
        });

        section.appendChild(article);
      });

      book.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Xatolik:', error);

    document.getElementById('book').textContent =
      'Kitobni yuklashda xatolik yuz berdi.';
  });
