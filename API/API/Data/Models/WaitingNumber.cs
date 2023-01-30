namespace API.Data
{
    public class WaitingNumber
    {
        public int Id { get; set; }
        public string? CreatedById { get; set; }
        public ApplicationUser? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        public string? ServedById { get; set; }
        public ApplicationUser? ServedBy { get; set; }
        public string? RefNbr { get; set; }

    }
}
