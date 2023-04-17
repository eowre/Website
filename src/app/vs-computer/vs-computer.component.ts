import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-vs-computer',
  templateUrl: './vs-computer.component.html',
  styleUrls: ['./vs-computer.component.css']
})
export class VsComputerComponent implements OnInit{

  ngOnInit() {
    this.redsPieces = document.querySelectorAll("P");
    if(this.turn) {
      for (let i = 0; i < this.redsPieces.length; i++) {
        this.redsPieces[i].addEventListener("click", this.getPlayerPieces);
      }
    } else  {
      for (let i = 0; i < this.blacksPieces.length; i++) {
        this.blacksPieces[i].addEventListener("click", this.getPlayerPieces);
      }
    }
    this.blacksPieces = document.querySelectorAll("span");
    this.cells = document.querySelectorAll("td");
    this.redTurnText = document.querySelectorAll(".red-turn-text");
    this.blackTurnText = document.querySelectorAll(".black-turn-text");
    this.divider = document.querySelector("#divider");
  }  
  board = [ null, 0, null, 1, null, 2, null, 3,
            4, null, 5, null, 6, null, 7, null,
            null, 8, null, 9, null, 10, null, 11,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            12, null, 13, null, 14, null, 15, null,
            null, 16, null, 17, null, 18, null, 19,
            20, null, 21, null, 22, null, 23, null];

  cells: NodeListOf<HTMLElement>;
  redsPieces: NodeListOf<HTMLElement>;
  blacksPieces: NodeListOf<HTMLElement>;
  redTurnText: NodeListOf<HTMLElement>;
  blackTurnText: NodeListOf<HTMLElement>;
  divider: HTMLElement;
  
  turn = true;
  redScore = 12;
  blackScore = 12;
  playerPieces: NodeListOf<HTMLElement>;

  selectedPiece = {
    pieceId: -1,
    indeexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
  }

  clicked() {
    alert("added event successfully");
  }

  // givePiecesEventListener() {
  //   if(this.turn) {
  //     for(let i = 0; i < this.redsPieces.length; i++) {
  //       this.redsPieces[i].addEventListener("click", this.getPlayerPieces.bind(this));
  //     }
  //   } else {
  //     for( let i = 0; i < this.blacksPieces.length; i++) {
  //       this.blacksPieces[i].addEventListener("click", this.getPlayerPieces.bind(this));
  //     }
  //   }
  // }

  getPlayerPieces(ev: MouseEvent) {
    alert(this.redsPieces.length);
    if (this.turn) {
      alert(this.redsPieces.length)
      this.playerPieces = this.redsPieces;
    } else {
      this.playerPieces = this.blacksPieces;
    }
    // alert(this.playerPieces.length);
    this.removeCellOnclick;
    this.resetBorders;
  }

  removeCellOnclick() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].removeAttribute("onClick");
    }
  }

  resetBorders(ev: any) {
    for (let i =0; i < this.playerPieces.length; i ++) {
      this.playerPieces[i].style.border = "1px solid white";
    }
    this.resetSelectedPieceProperties();
    this.getSelectedPiece(ev);
  }

  resetSelectedPieceProperties() {
    this.selectedPiece.pieceId = -1;
    this.selectedPiece.indeexOfBoardPiece = -1;
    this.selectedPiece.isKing = false;
    this.selectedPiece.seventhSpace = false;
    this.selectedPiece.ninthSpace = false;
    this.selectedPiece.fourteenthSpace = false;
    this.selectedPiece.eighteenthSpace = false;
    this.selectedPiece.minusSeventhSpace = false;
    this.selectedPiece.minusNinthSpace = false;
    this.selectedPiece.minusFourteenthSpace = false;
    this.selectedPiece.minusEighteenthSpace = false;
  }

  getSelectedPiece(ev: any) {
    this.selectedPiece.pieceId = parseInt(ev.target.id);
    this.selectedPiece.indeexOfBoardPiece = this.findPiece(this.selectedPiece.pieceId);
    this.isPieceKing();
  }

  findPiece(pieceId: any) {
    let parsed = parseInt(pieceId)
    return this.board.indexOf(parsed)
  }

  isPieceKing() {
    if(document.getElementById(this.selectedPiece.pieceId.toString())?.classList.contains("king")) {
      this.selectedPiece.isKing = true;
    } else {
      this.selectedPiece.isKing = false;
    }
    this.getAvailbleSpaces();
  }

  getAvailbleSpaces() {
    if(this.board[this.selectedPiece.indeexOfBoardPiece + 7] === null && this.cells[this.selectedPiece.indeexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
      this.selectedPiece.seventhSpace = true;
    }
    if(this.board[this.selectedPiece.indeexOfBoardPiece + 9] === null && this.cells[this.selectedPiece.indeexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
      this.selectedPiece.ninthSpace = true;
    }
    if(this.board[this.selectedPiece.indeexOfBoardPiece - 7] === null && this.cells[this.selectedPiece.indeexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
      this.selectedPiece.minusSeventhSpace = true;
    }
    if(this.board[this.selectedPiece.indeexOfBoardPiece - 9] === null && this.cells[this.selectedPiece.indeexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
      this.selectedPiece.minusNinthSpace = true;
    }
    this.checkAvaibleJumpSpaces();
  }

  checkAvaibleJumpSpaces() {
    if(this.turn) {
      if (this.board[this.selectedPiece.indeexOfBoardPiece + 14] === null && 
        this.cells[this.selectedPiece.indeexOfBoardPiece + 14].classList.contains("noPieceHere") !== true &&
        this.board[this.selectedPiece.indeexOfBoardPiece + 7] >= 12) {
          this.selectedPiece.fourteenthSpace = true;
      } else {
        if (this.board[this.selectedPiece.indeexOfBoardPiece + 14] === null && 
          this.cells[this.selectedPiece.indeexOfBoardPiece + 14].classList.contains("noPieceHere") !== true &&
          this.board[this.selectedPiece.indeexOfBoardPiece + 7] < 12 && this.board[this.selectedPiece.indeexOfBoardPiece + 7] !== null) {
            this.selectedPiece.fourteenthSpace = true;
          }
      }
    }
    this.checkPieceConditions();
  }

  checkPieceConditions() {
    if(this.selectedPiece.isKing) {
      this.givePieceBorder();
    } else {
      if(this.turn) {
        this.selectedPiece.minusSeventhSpace = false;
        this.selectedPiece.minusNinthSpace = false;
        this.selectedPiece.minusFourteenthSpace = false;
        this.selectedPiece.minusEighteenthSpace = false;
      } else {
        this.selectedPiece.seventhSpace = false;
        this.selectedPiece.ninthSpace = false;
        this.selectedPiece.fourteenthSpace = false;
        this.selectedPiece.eighteenthSpace = false;
      }
      this.givePieceBorder();
    }
  }

  givePieceBorder() {
    if (this.selectedPiece.seventhSpace || this.selectedPiece.ninthSpace || this.selectedPiece.fourteenthSpace || this.selectedPiece.eighteenthSpace ||this.selectedPiece.minusSeventhSpace ||
      this.selectedPiece.minusNinthSpace || this.selectedPiece.minusFourteenthSpace || this.selectedPiece.minusEighteenthSpace) {
        document.getElementById(this.selectedPiece.pieceId.toString()).style.border = "3px solid green";
        this.giveCellsClick();
    } else {
      return;
    }
  }

  giveCellsClick() {
    if (this.selectedPiece.seventhSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece + 7].setAttribute("onClick", "makeMove(7)");
    }
    if (this.selectedPiece.ninthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece + 9].setAttribute("onClick", "makeMove(9)");
    }
    if (this.selectedPiece.fourteenthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece + 14].setAttribute("onClick", "makeMove(14)");
    }
    if (this.selectedPiece.eighteenthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece + 18].setAttribute("onClick", "makeMove(18)");
    }
    if (this.selectedPiece.minusSeventhSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece - 7].setAttribute("onClick", "makeMove(-7)");
    }
    if (this.selectedPiece.minusNinthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece - 9].setAttribute("onClick", "makeMove(-9)");
    }
    if (this.selectedPiece.minusFourteenthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece - 14].setAttribute("onClick", "makeMove(-14)");
    }
    if (this.selectedPiece.minusEighteenthSpace) {
      this.cells[this.selectedPiece.indeexOfBoardPiece - 18].setAttribute("onClick", "makeMove(-18)");
    }
  }

  makeMove(num: number) {
    document.getElementById(this.selectedPiece.pieceId.toString()).remove();
    this.cells[this.selectedPiece.indeexOfBoardPiece].innerHTML = "";
    if(this.turn) {
      if(this.selectedPiece.isKing) {
        this.cells[this.selectedPiece.indeexOfBoardPiece + num].innerHTML = '<p class="red-piece king" id="${this.selectedPiece.pieceId}"></p>';
        this.redsPieces = document.querySelectorAll("P");
      } else {
        this.cells[this.selectedPiece.indeexOfBoardPiece + num].innerHTML = '<p class="red-piece" id="${this.selectedPiece.pieceId}"></p>';
        this.redsPieces = document.querySelectorAll("P");
      }
    } else {
      if(this.selectedPiece.isKing) {
        this.cells[this.selectedPiece.indeexOfBoardPiece + num].innerHTML = '<span class="black-piece king" id="${this.selectedPiece.pieceId}"></cpan>';
        this.blacksPieces = document.querySelectorAll("span");
      } else {
        this.cells[this.selectedPiece.indeexOfBoardPiece + num].innerHTML = '<span class="black-piece" id="${this.selectedPiece.pieceId}"></span>';
        this.blacksPieces = document.querySelectorAll("span");
      }
    }
    let indexOfPiece = this.selectedPiece.indeexOfBoardPiece;
    if ( num === 14 || num === -14 || num === 18 || num === -18) {
      this.changeData(indexOfPiece, indexOfPiece + num, indexOfPiece + num / 2);
    } else {
      this.changeData(indexOfPiece, indexOfPiece + num , null)
    }
  }

  changeData(indexOfBoardPiece: any, modifiedIndex: any, _removePiece: any) {
    this.board[indexOfBoardPiece] = null;
    this.board[modifiedIndex] = this.selectedPiece.pieceId;
    if(this.turn && this.selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
      document.getElementById(this.selectedPiece.pieceId.toString()).classList.add("king");
    }
    if(!this.turn && this.selectedPiece.pieceId < 12 && modifiedIndex <= 7) {
      document.getElementById(this.selectedPiece.pieceId.toString()).classList.add("king");
    }
    if (_removePiece) {
      this.board[_removePiece] = null;
      if (this.turn && this.selectedPiece.pieceId < 12) {
        this.cells[_removePiece].innerHTML = "";
        this.blackScore--;
      }
      if (this.turn && this.selectedPiece.pieceId >= 12) {
        this.cells[_removePiece].innerHTML = "";
        this.redScore--;
      }
    }
    this.resetSelectedPieceProperties();
    this.removeCellOnclick();
    this.removeEventListeners();
  }

  removeEventListeners() {
    if(this.turn) {
      for (let i = 0; i < this.redsPieces.length; i++) {
        this.redsPieces[i].removeEventListener("click", this.getPlayerPieces);
      }
    } else {
      for (let i = 0; i< this.blacksPieces.length; i ++) {
        this.blacksPieces[i].removeEventListener("click", this.getPlayerPieces);
      }
    }
    this.checkForWin();
  }

  checkForWin() {
    if ( this.blackScore === 0 ) {
      this.divider.style.display = "none";
      for (let i = 0; i < this.redTurnText.length; i++) {
        this.redTurnText[i].style.color = "black";
        this.blackTurnText[i].style.display = "none";
        this.redTurnText[i].textContent = "RED WINS!";
      }
    } else if ( this.redScore === 0) {
      this.divider.style.display = "none";
      for (let i = 0; i < this.blackTurnText.length; i++) {
        this.blackTurnText[i].style.color = "black";
        this.redTurnText[i].style.display = " none";
        this.blackTurnText[i].textContent = "BLACK WINS!";
      }
    }
    this.changePlayer();
  }

  changePlayer() {
    if(this.turn) {
      this.turn = false;
      for ( let i = 0; i < this.redTurnText.length; i++) {
        this.redTurnText[i].style.color = "lightGrey";
        this.blackTurnText[i].style.color = "black";
      }
    } else {
      this.turn = true;
      for ( let i = 0; i < this.blackTurnText.length; i++) {
        this.redTurnText[i].style.color = "black";
        this.blackTurnText[i].style.color = "lightGrey";
      }
    }
  }
}

/*
Hi I hope this message finds you well, my name is Evan Owre and I am a perfect candidate for this position. I have been programing for 5 years and have a strong grasp on OOP as well as a proficiency in developing AGILE and WATERFALL solutions. For the last two years I have been leveraging these skills to deploy cloud based APIs with CI/CD capabilities. What separates me from other candidates is my ability to acknowledge gaps in my skill set and fill them quickly. I have never been afraid of failure but rather afraid to try, with this philosophy any task I put my mind to I can complete. I hope to hear from you soon so we can discuss why I am the correct candidate for this position.
Best Regards - Evan 
*/