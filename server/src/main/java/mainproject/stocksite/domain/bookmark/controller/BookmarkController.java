package mainproject.stocksite.domain.bookmark.controller;

import mainproject.stocksite.domain.bookmark.dto.BookmarkRequestDto;
import mainproject.stocksite.domain.bookmark.dto.BookmarkResponseDto;
import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import mainproject.stocksite.domain.bookmark.mapper.BookmarkMapper;
import mainproject.stocksite.domain.bookmark.service.BookmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkMapper bookmarkMapper;
    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkMapper bookmarkMapper, BookmarkService bookmarkService) {
        this.bookmarkMapper = bookmarkMapper;
        this.bookmarkService = bookmarkService;
    }

    @PostMapping
    public ResponseEntity<BookmarkResponseDto> postBookmark(@Valid @RequestBody BookmarkRequestDto.Post requestBody) {
        Bookmark bookmark = bookmarkService.createBookmark(bookmarkMapper.bookmarkPostDtoToBookmark(requestBody));
        BookmarkResponseDto response = bookmarkMapper.bookmarkToBookmarkResponseDto(bookmark);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{bookmark-id}")
    public ResponseEntity<BookmarkResponseDto> patchBookmark(@PathVariable("bookmark-id") @Positive long bookmarkId,
                                                             @Valid @RequestBody BookmarkRequestDto.Patch requestBody) {

        requestBody.setBookmarkId(bookmarkId);
        Bookmark bookmark = bookmarkService.updateBookmark(bookmarkMapper.bookmarkPatchDtoToBookmark(requestBody));
        BookmarkResponseDto response = bookmarkMapper.bookmarkToBookmarkResponseDto(bookmark);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<List<BookmarkResponseDto>> getBookmarks(@PathVariable("member-id") @Positive long memberId) {
        List<Bookmark> bookmarks = bookmarkService.findBookmarks(memberId);
        List<BookmarkResponseDto> response = bookmarkMapper.bookmarksToBookmarkResponseDtos(bookmarks);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{bookmark-id}")
    public void deleteBookmark(@PathVariable("bookmark-id") @Positive long bookmarkId) {
        bookmarkService.deleteBookmark(bookmarkId);
    }

    @DeleteMapping("/member/{member-id}")
    public ResponseEntity<HttpStatus> deleteBookmarks(@PathVariable("member-id") @Positive long memberId) {
        bookmarkService.deleteBookmarks(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
