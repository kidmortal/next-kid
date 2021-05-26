import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/dist/utils/testing"
import { BaixasRealizadasTable } from "../../../components/baixarContas/BaixasRealizadasTable"
import { BaixaProps, useAppContext } from "../../../context/AppContext"


jest.mock("../../../context/AppContext")
const useAppContextMocked = mocked(useAppContext)
const baixas: BaixaProps[] = [
  { codigo_baixa: 11111, data_baixa: "13/10/2021", nota_fiscal: "1111", valor_baixado: 120.25, codigo_lancamento: 123, liquidado: "S" },
  { codigo_baixa: 11112, data_baixa: "15/10/2021", nota_fiscal: "1112", valor_baixado: 120, codigo_lancamento: 124, liquidado: "S" },
  { codigo_baixa: 11113, data_baixa: "18/10/2021", nota_fiscal: "1113", valor_baixado: 0.25, codigo_lancamento: 125, liquidado: "S" },
  { codigo_baixa: 11114, data_baixa: "21/10/2021", nota_fiscal: "1114", valor_baixado: 12333, codigo_lancamento: 126, liquidado: "S" },
  { codigo_baixa: 11115, data_baixa: "23/10/2021", nota_fiscal: "1115", valor_baixado: 1202, codigo_lancamento: 127, liquidado: "S" }]
useAppContextMocked.mockReturnValue({ baixas, removeBaixa: jest.fn, setBaixas: jest.fn } as any)


describe('Baixas Table list', () => {

  it('Should display only 5 elements per page', async () => {
    const { findAllByRole } = render(<BaixasRealizadasTable />)
    let rows = await findAllByRole("row")
    expect(rows[0]).toBeInTheDocument()
    expect(rows[1]).toBeInTheDocument()
    expect(rows[2]).toBeInTheDocument()
    expect(rows[3]).toBeInTheDocument()
    expect(rows[4]).toBeInTheDocument()
  })

  it('Should show Number, date and value formated to R$', async () => {
    const { findAllByRole, debug } = render(<BaixasRealizadasTable />)
    let row = await findAllByRole("row")
    expect(row[0].childNodes[0].textContent).toBe("1111")
    expect(row[0].childNodes[1].textContent).toBe("R$ 120.25")
    expect(row[0].childNodes[2].textContent).toBe("13/10/2021")
    expect(row[0].childNodes[3].textContent).toBe("Liquidado: ✔")
  })

  it('Should Remove baixa from the list when Right icon is clicked', () => {

  })

  it('Should Move to next page when right arrow icon is clicked', () => {

  })

  it('Should Move to previous page when left arrow icon is clicked', () => {

  })

})


export { }