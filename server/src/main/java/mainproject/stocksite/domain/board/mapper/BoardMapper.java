package mainproject.stocksite.domain.board.mapper;

import mainproject.stocksite.domain.board.dto.BoardPatchDto;
import mainproject.stocksite.domain.board.dto.BoardPostDto;
import mainproject.stocksite.domain.board.dto.BoardResponseDto;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    default Board boardPostDtoToEntity(BoardPostDto boardPostDto) {

        Board board = new Board();
        Member member = new Member();
        member.setMemberId(boardPostDto.getMemberId());
        board.setMember(member);
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        return board;
    }

    default Board boardPatchDtoToEntity(BoardPatchDto boardPatchDto) {
        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        return board;
    }

    default List<BoardResponseDto> boardListToResponseDto(List<Board> boardList) {
        return boardList.stream().map(this::boardToResponseDto).toList();
    }


    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickname", target = "nickname")
    @Mapping(source = "member.username", target = "username")
    BoardResponseDto boardToResponseDto(Board board);

}
