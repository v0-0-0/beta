
fetch('otkan-kunlar.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('JSON fayl yuklanmadi');
    }
    return response.json();
  })
  .then(data => {
    const book = document.getElementById('book');

    // Kitob sarlavhasi
    const title = document.createElement('h1');
    title.textContent = data.title_latin || data.title;
    book.appendChild(title);

    // Muallif
    const author = document.createElement('p');
    author.textContent = data.author_latin || data.author;
    book.appendChild(author);

    // So'zboshi
    if (data.preface) {
      const preface = document.createElement('section');

      const heading = document.createElement('h2');
      heading.textContent = 'So‘zboshi';
      preface.appendChild(heading);

      data.preface.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        preface.appendChild(p);
      });

      book.appendChild(preface);
    }

    // Barcha bo'limlar va boblar
    data.parts.forEach(part => {
      const section = document.createElement('section');

      const partTitle = document.createElement('h2');
      partTitle.textContent = part.title;
      section.appendChild(partTitle);

      part.chapters.forEach(chapter => {
        const article = document.createElement('article');

        const chapterTitle = document.createElement('h3');
        chapterTitle.textContent =
          chapter.number + '. ' + chapter.title;

        article.appendChild(chapterTitle);

        // Bobning barcha paragraflari
        chapter.paragraphs.forEach(text => {
          const p = document.createElement('p');
          p.textContent = text;
          article.appendChild(p);
        });

        section.appendChild(article);
      });

      book.appendChild(section);
    });
  })
  .catch(error => {
    console.error(error);
    document.getElementById('book').textContent =
      'Kitobni yuklashda xatolik yuz berdi.';
  });
