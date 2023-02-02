package mainproject.stocksite.domain.comment.mapper;

import mainproject.stocksite.domain.comment.dto.CommentPatchDto;
import mainproject.stocksite.domain.comment.dto.CommentPostDto;
import mainproject.stocksite.domain.comment.dto.CommentResponseDto;
import mainproject.stocksite.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentPostDto commentPostDto);

    default Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto) {
        Comment comment = new Comment();
        comment.setCommentId(commentPatchDto.getCommentId());
        comment.setContent(commentPatchDto.getContent());
        return comment;
    }

    default CommentPostDto.ResponseDto commentToCommentPostResponseDto(Comment comment) {
        if (comment == null) {
            return null;
        }

        CommentPostDto.ResponseDto responseDto = new CommentPostDto.ResponseDto();

        responseDto.setCommentId(comment.getCommentId());
        responseDto.setMemberId(comment.getMember().getMemberId());
        responseDto.setBoardId(comment.getBoard().getBoardId());
        if (comment.getContent() != null) {
            responseDto.setContent(comment.getContent());
        }
        responseDto.setCreatedAt(comment.getCreatedAt());
        responseDto.setModifiedAt(comment.getModifiedAt());

        return responseDto;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.username", target = "username")
    @Mapping(source = "member.nickname", target = "nickname")
    @Mapping(source = "board.boardId", target = "boardId")
    CommentResponseDto commentToResponseDto(Comment comment);

    List<CommentResponseDto> commentToCommentResponseDtos(List<Comment> comments);
}
