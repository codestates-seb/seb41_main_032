package mainproject.stocksite.domain.bookmark.service;

import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import mainproject.stocksite.domain.bookmark.repository.BookmarkRepository;
import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    @Transactional
    public Bookmark createBookmark(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }

    @Transactional
    public Bookmark updateBookmark(Bookmark bookmark) {
        Bookmark findBookmark = findBookmark(bookmark.getBookmarkId());
        Optional.ofNullable(bookmark.getStockCode()).ifPresent(findBookmark::setStockCode);
        Optional.ofNullable(bookmark.getStockName()).ifPresent(findBookmark::setStockName);

        return bookmarkRepository.save(findBookmark);
    }

    @Transactional(readOnly = true)
    public List<Bookmark> findBookmarks() {
        return bookmarkRepository.findAll();
    }

    @Transactional
    public void deleteBookmark(long bookmarkId) {
        bookmarkRepository.deleteById(findBookmark(bookmarkId).getBookmarkId());
    }

    @Transactional
    public void deleteBookmarks() {
        bookmarkRepository.deleteAll();
    }

    private Bookmark findBookmark(long bookmarkId) {
        Optional<Bookmark> findBookmark = bookmarkRepository.findById(bookmarkId);

        return findBookmark.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
    }
}
