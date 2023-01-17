package mainproject.stocksite.domain.bookmark.mapper;

import mainproject.stocksite.domain.bookmark.dto.BookmarkRequestDto;
import mainproject.stocksite.domain.bookmark.dto.BookmarkResponseDto;
import mainproject.stocksite.domain.bookmark.entity.Bookmark;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookmarkMapper {
    Bookmark bookmarkPostDtoToBookmark(BookmarkRequestDto.Post bookmarkPostDto);
    Bookmark bookmarkPatchDtoToBookmark(BookmarkRequestDto.Patch bookmarkPatchDto);
    BookmarkResponseDto bookmarkToBookmarkResponseDto(Bookmark bookmark);
    List<BookmarkResponseDto> bookmarksToBookmarkResponseDtos(List<Bookmark> bookmarks);
}
