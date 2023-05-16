import { Component } from '@angular/core';

interface Seat {
  seatNumber: number;
  reserved: boolean;
}

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css'],
})
export class SeatReservationComponent {
  seatLayout: Seat[][];
  numSeats: number = 0;

  constructor() {
    this.seatLayout = [];
    this.numSeats = 0;
    this.initializeSeatLayout();
  }

  initializeSeatLayout(): void {
    const numRows = 11;
    const seatsPerRow = 7;
    const lastRowSeats = 3;

    for (let row = 0; row < numRows; row++) {
      const seats: Seat[] = [];

      const numSeatsInRow = row === numRows - 1 ? lastRowSeats : seatsPerRow;
      for (let seatNumber = 1; seatNumber <= numSeatsInRow; seatNumber++) {
        seats.push({ seatNumber, reserved: false });
      }

      this.seatLayout.push(seats);
    }
  }

  reserveSeat(seat: Seat): void {
    if (!seat.reserved) {
      seat.reserved = true;
    }
  }

  submitForm(): void {
    const numSeatsToReserve = Math.floor(this.numSeats);
    let seatsReserved = 0;

    for (
      let row = 0;
      row < this.seatLayout.length && seatsReserved < numSeatsToReserve;
      row++
    ) {
      const currentRow = this.seatLayout[row];
      for (let seat of currentRow) {
        if (!seat.reserved) {
          seat.reserved = true;
          seatsReserved++;
        }

        if (seatsReserved === numSeatsToReserve) {
          break;
        }
      }
    }

    this.numSeats = 0;
  }
}
