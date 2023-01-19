package mainproject.stocksite.domain.bookmark.mapper;

import mainproject.stocksite.domain.bookmark.dto.BookmarkRequestDto;
import mainproject.stocksite.domain.bookmark.dto.BookmarkResponseDto;
import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import mainproject.stocksite.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookmarkMapper {

    default Bookmark bookmarkPostDtoToBookmark(BookmarkRequestDto.Post bookmarkPostDto) {
        if (bookmarkPostDto == null) {
            return null;
        } else {
            Bookmark bookmark = new Bookmark();
            Member member = new Member();
            member.setMemberId(bookmarkPostDto.getMemberId());
            bookmark.setStockCode(bookmarkPostDto.getStockCode());
            bookmark.setStockName(bookmarkPostDto.getStockName());
            bookmark.setMember(member);

            return bookmark;
        }
    }

    Bookmark bookmarkPatchDtoToBookmark(BookmarkRequestDto.Patch bookmarkPatchDto);

    default BookmarkResponseDto bookmarkToBookmarkResponseDto(Bookmark bookmark) {
        if (bookmark == null) {
            return null;
        } else {
            BookmarkResponseDto bookmarkResponseDto = new BookmarkResponseDto();
            bookmarkResponseDto.setBookmarkId(bookmark.getBookmarkId());
            bookmarkResponseDto.setStockCode(bookmark.getStockCode());
            bookmarkResponseDto.setStockName(bookmark.getStockName());
            bookmarkResponseDto.setMemberId(bookmark.getMember().getMemberId());
            return bookmarkResponseDto;
        }
    }

    List<BookmarkResponseDto> bookmarksToBookmarkResponseDtos(List<Bookmark> bookmarks);
}
