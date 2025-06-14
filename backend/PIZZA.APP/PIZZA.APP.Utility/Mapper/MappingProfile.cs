using AutoMapper;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;

namespace PIZZA.APP.Utility.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PizzaType, PizzaTypeDto>().ReverseMap();
            CreateMap<Pizza, PizzaDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailDto>().ReverseMap();
        }
    }
}
