using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaitingNumbersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WaitingNumbersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/WaitingNumbers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaitingNumberDto>>> GetWaitingNumbers()
        {
            var list = new List<WaitingNumberDto>();
            var result = await _context.WaitingNumbers.Include(x => x.CreatedBy).Include(x => x.ServedBy).ToListAsync();

            foreach (var item in result)
            {
                list.Add(ModelToDto(item));
            }

            return list;
        }

        [HttpGet]
        [Route("GetForToday")]
        public async Task<ActionResult<IEnumerable<WaitingNumberDto>>> GetForToday()
        {
            var list = new List<WaitingNumberDto>(); 
            var now = DateTime.Now;
            var result = await _context.WaitingNumbers.Include(x => x.CreatedBy).Include(x => x.ServedBy)
                .Where(x => x.CreatedOn.Year == now.Year && x.CreatedOn.Month == now.Month && x.CreatedOn.Day == now.Day && x.Status == "waiting").ToListAsync();

            foreach (var item in result)
            {
                list.Add(ModelToDto(item));
            }

            return list;
        }

        // GET: api/WaitingNumbers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WaitingNumberDto>> GetWaitingNumber(int id)
        {
            var waitingNumber = await _context.WaitingNumbers.Include(x => x.CreatedBy).Include(x => x.ServedBy).FirstOrDefaultAsync(x=> x.Id == id);

            if (waitingNumber == null)
            {
                return NotFound();
            }

            return ModelToDto(waitingNumber);
        }

        [HttpGet]
        [Route("GetForTodayAndUserId/{userId}")]
        public async Task<ActionResult<WaitingNumber>> GetWaitingNumberForTodayAndUserId(string userId)
        {
            var now = DateTime.Now;

            var waitingNumber = await _context.WaitingNumbers
                .FirstOrDefaultAsync(x => x.CreatedOn.Year == now.Year && x.CreatedOn.Month == now.Month && x.CreatedOn.Day == now.Day &&
                x.CreatedById == userId && x.Status == "waiting");

            return waitingNumber;
        }

        [HttpGet]
        [Route("GetLast")]
        public async Task<ActionResult<WaitingNumber>> GetLast()
        {
            var lastId = _context.WaitingNumbers.Max(x => x.Id);
            return await _context.WaitingNumbers.FirstOrDefaultAsync(x => x.Id == lastId && x.CreatedById == null);
        }

        // PUT: api/WaitingNumbers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWaitingNumber(int id, WaitingNumber waitingNumber)
        {
            if (id != waitingNumber.Id)
            {
                return BadRequest();
            }

            _context.Entry(waitingNumber).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WaitingNumberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WaitingNumbers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WaitingNumber>> PostWaitingNumber(WaitingNumber waitingNumber)
        {
            _context.WaitingNumbers.Add(waitingNumber);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWaitingNumber", new { id = waitingNumber.Id }, waitingNumber);
        }

        // DELETE: api/WaitingNumbers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaitingNumber(int id)
        {
            var waitingNumber = await _context.WaitingNumbers.FindAsync(id);
            if (waitingNumber == null)
            {
                return NotFound();
            }
            _context.WaitingNumbers.Remove(waitingNumber);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WaitingNumberExists(int id)
        {
            return _context.WaitingNumbers.Any(e => e.Id == id);
        }

        private WaitingNumberDto ModelToDto(WaitingNumber item)
        {
            var dto = new WaitingNumberDto();
            dto.Id = item.Id;
            dto.CreatedOn = item.CreatedOn;
            dto.Status = item.Status;
            dto.RefNbr = item.RefNbr;
            dto.CreatedById = item.CreatedById;
            dto.ServedById = item.ServedById;
            dto.CreatedBy = item.CreatedBy == null ? null : item.CreatedBy.UserName;
            dto.ServedBy = item.ServedBy == null ? null : item.ServedBy.UserName;

            return dto;
        }
    }
}
