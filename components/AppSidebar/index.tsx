import { ChevronDown, Map as MapIcon, MapPin } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { FaBookmark, FaHome, FaMapPin } from "react-icons/fa";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLayerType } from "@/hooks/layer-type-map";
import { colorClasses } from "@/lib/color-classes";
import { base_layers, type IWMSLayer } from "@/lib/layers";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

interface IAppSidebarProps {
    layer: {
        activeLayer: {
            label: string;
            attribution: string;
            url: string;
        };
    };
    wms_layers: {
        wmsLayerManager: IWMSLayer[];
        setWmsLayerManager: Dispatch<SetStateAction<IWMSLayer[]>>;
    };
}

export function AppSidebar({ layer: { activeLayer }, wms_layers }: IAppSidebarProps) {
    const { setStoredLayerType } = useLayerType();

    return (
        <Sidebar className="border-r border-gray-200 bg-gradient-to-b from-slate-50 to-white">
            <SidebarHeader>
                <div className=" mb-3 flex items-center justify-center h-20 bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg rounded-lg mx-6 mt-3 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                            <MapPin className="w-6 h-6 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-wide drop-shadow-sm">
                                Mapa BR
                            </h1>
                            <p className="text-xs text-white/80">Informações inteligentes</p>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-1 border-t pb-4">
                {/* <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger asChild>
                            <SidebarGroupLabel
                                className="flex items-center justify-between cursor-pointer select-none 
                 text-sm font-semibold text-gray-600 mb-2 px-2 py-2 rounded-lg 
                 hover:bg-gray-100 transition"
                            >
                                <span>Navegação</span>
                                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarGroupLabel>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-1">
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                                            <FaHome className="text-lg" />
                                            <span className="font-medium">Início</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                                            <FaMapPin className="text-lg" />
                                            <span className="font-medium">Localização</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                     <SidebarMenuItem>
                                <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                                    <FaSearch className="text-lg" />
                                    <span className="font-medium">Pesquisar</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem> 
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                                            <FaBookmark className="text-lg" />
                                            <span className="font-medium">Favoritos</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>

                    </SidebarGroup>
                </Collapsible > */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger asChild>
                            <SidebarGroupLabel
                                className="flex items-center justify-between cursor-pointer select-none 
                 text-sm font-semibold text-gray-600 mb-2 px-2 py-2 rounded-lg 
                 hover:bg-gray-100 transition"
                            >
                                <span>Camadas</span>
                                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarGroupLabel>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="">
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {wms_layers.wmsLayerManager.map((layer) => {
                                        return (
                                            <SidebarMenuItem key={layer.name} >

                                                <SidebarMenuButton
                                                    className={`text-xs flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 ${layer.active && "!bg-green-100 !text-green-600"}`}
                                                    onClick={() => {
                                                        wms_layers.setWmsLayerManager(prev =>
                                                            prev.map(l =>
                                                                l.name === layer.name
                                                                    ? { ...l, active: !l.active }
                                                                    : l
                                                            )
                                                        );
                                                    }}

                                                >
                                                    <MapIcon className="text-lg flex-shrink-0" />
                                                    <span className="font-medium break-words whitespace-normal flex-1">
                                                        {layer.name}
                                                    </span>
                                                </SidebarMenuButton>


                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200 bg-gray-50 ">
                {/* Modelo para implementação de usuários */}
                {/* <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-t-lg mx-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            U
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                Usuário
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                usuario@email.com
                            </p>
                        </div>
                    </div>
                </div> */}

                <Collapsible defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                        <SidebarGroupLabel
                            className="flex items-center justify-between cursor-pointer select-none 
                 text-sm font-semibold text-gray-600 mb-2 px-2 py-2 rounded-lg 
                 hover:bg-gray-100 transition"
                        >
                            <span>Camadas Base</span>
                            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarGroupLabel>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pl-1">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {base_layers.map((layer) => (
                                    <SidebarMenuItem key={layer.label}>
                                        <SidebarMenuButton
                                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 
                ${colorClasses[layer.style.color].hover} 
                ${activeLayer?.label === layer.label &&
                                                colorClasses[layer.style.color].active
                                                }`}
                                            onClick={() => {
                                                /*  setActiveLayer({
                                                                                                     attribution: layer.attribution,
                                                                                                     label: layer.label,
                                                                                                     url: layer.url,
                                                                                                 }); */
                                                setStoredLayerType(layer.id);
                                            }}
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full ${colorClasses[layer.style.color].bg} text-white flex items-center justify-center shadow-md`}
                                            >
                                                <span className="font-semibold text-sm">
                                                    {layer.style.letter}
                                                </span>
                                            </div>
                                            <span className="font-medium">{layer.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>

                {/* Modelo para implementação de configurações */}
                {/*  <SidebarGroup className="">
                    <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-2">
                        Configurações
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
                                    <FaCog className="text-lg" />
                                    <span className="font-medium">Preferências</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
            </SidebarFooter>
        </Sidebar>
    );
}
