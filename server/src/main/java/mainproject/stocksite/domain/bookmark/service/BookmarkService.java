package mainproject.stocksite.domain.bookmark.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import mainproject.stocksite.domain.bookmark.repository.BookmarkRepository;
import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    private final MemberService memberService;

    @Transactional
    public Bookmark createBookmark(Bookmark bookmark) {
        checkBookmarkListFull(bookmark);

        memberService.verifyExistsMember(bookmark.getMember().getMemberId());

        verifyExistsBookmark(bookmark);

        return saveBookmark(bookmark);
    }

    @Transactional
    public Bookmark updateBookmark(Bookmark bookmark) {
        Bookmark findBookmark = verifyExistsBookmark(bookmark.getBookmarkId());
        Optional.ofNullable(bookmark.getStockCode()).ifPresent(findBookmark::setStockCode);
        Optional.ofNullable(bookmark.getStockName()).ifPresent(findBookmark::setStockName);

        return bookmarkRepository.save(findBookmark);
    }

    @Transactional(readOnly = true)
    public List<Bookmark> findBookmarks(long memberId) {
        memberService.verifyExistsMember(memberId);

        return bookmarkRepository.findAllByMember_MemberId(memberId);
    }

    @Transactional
    public void deleteBookmark(long bookmarkId) {
        bookmarkRepository.deleteById(verifyExistsBookmark(bookmarkId).getBookmarkId());
    }

    @Transactional
    public void deleteBookmarks(long memberId) {
        memberService.verifyExistsMember(memberId);

        bookmarkRepository.deleteAllByMember_MemberId(memberId);
    }

    private Bookmark verifyExistsBookmark(long bookmarkId) {
        Optional<Bookmark> findBookmark = bookmarkRepository.findById(bookmarkId);

        return findBookmark.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
    }

    private void verifyExistsBookmark(Bookmark bookmark) {
        List<Bookmark> BookmarkListOfSpecificMember = bookmarkRepository.findAllByMember_MemberId(bookmark.getMember().getMemberId());
        List<String> stockCodeListOfSpecificMember = BookmarkListOfSpecificMember.stream().map(Bookmark::getStockCode).collect(Collectors.toList());

        if (stockCodeListOfSpecificMember.stream().anyMatch(stockCode -> stockCode.equals(bookmark.getStockCode())))
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTED_BO0MARK);
    }

    private Bookmark saveBookmark(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }

    public void checkBookmarkListFull(Bookmark bookmark) {
        List<Bookmark> bookmarkList = findBookmarks(bookmark.getMember().getMemberId());
        if (bookmarkList.size() == 5)
            throw new BusinessLogicException(ExceptionCode.BOOKMARK_LIST_ARE_FULL);
    }
}
