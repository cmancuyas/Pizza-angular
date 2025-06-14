using AutoMapper;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;
using System.Globalization;

namespace PIZZA.APP.Utility.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // PizzaType
            CreateMap<PizzaType, PizzaTypeDto>()
                .ForMember(dest => dest.PizzaTypeCode, opt => opt.MapFrom(src => src.PizzaTypeCode));
            CreateMap<PizzaTypeDto, PizzaType>()
                .ForMember(dest => dest.PizzaTypeCode, opt => opt.MapFrom(src => src.PizzaTypeCode));

            // Pizza
            CreateMap<PizzaCreateDto, Pizza>()
                .ForMember(dest => dest.PizzaCode, opt => opt.MapFrom(src => src.PizzaCode))
                .ForMember(dest => dest.PizzaTypeId, opt => opt.Ignore()); // To be resolved in service/controller

            CreateMap<PizzaEditDto, Pizza>()
                .ForMember(dest => dest.PizzaCode, opt => opt.MapFrom(src => src.PizzaCode))
                .ForMember(dest => dest.PizzaTypeId, opt => opt.Ignore()); // resolve manually

            CreateMap<Pizza, PizzaDto>()
                .ForMember(dest => dest.PizzaCode, opt => opt.MapFrom(src => src.PizzaCode))
                .ForMember(dest => dest.PizzaTypeCode, opt => opt.MapFrom(src => src.PizzaType.PizzaTypeCode));

            CreateMap<Pizza, PizzaEditDto>()
                .ForMember(dest => dest.PizzaCode, opt => opt.MapFrom(src => src.PizzaCode))
                .ForMember(dest => dest.PizzaTypeCode, opt => opt.MapFrom(src => src.PizzaType.PizzaTypeCode));

            // Order
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.Time.ToString(@"hh\:mm")));

            CreateMap<OrderDto, Order>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => DateTime.ParseExact(src.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.Time, opt => opt.MapFrom(src => TimeSpan.Parse(src.Time)));

            // OrderDetail
            CreateMap<OrderDetail, OrderDetailDto>()
                .ForMember(dest => dest.PizzaCode, opt => opt.MapFrom(src => src.Pizza.PizzaCode))
                .ForMember(dest => dest.Pizza, opt => opt.MapFrom(src => src.Pizza));

            CreateMap<OrderDetailDto, OrderDetail>()
                .ForMember(dest => dest.PizzaId, opt => opt.Ignore()); // Resolve PizzaId from PizzaCode in controller/service

            CreateMap<OrderDetailCreateDto, OrderDetail>()
                .ForMember(dest => dest.PizzaId, opt => opt.Ignore()); // Same reason
        }
    }
}
